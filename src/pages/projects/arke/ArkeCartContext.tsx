import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { products } from "./arkeData"
import ArkeFlyToBag, { type FlyItem } from "./ArkeFlyToBag"

const STORAGE_KEY = "arke-cart-v2"

export type CartLine = {
  key: string
  productId: number
  size: string
  qty: number
}

export function cartLineKey(productId: number, size: string) {
  return `${productId}::${size}`
}

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line): line is CartLine =>
        !!line &&
        typeof line === "object" &&
        typeof (line as CartLine).productId === "number" &&
        typeof (line as CartLine).size === "string" &&
        typeof (line as CartLine).qty === "number" &&
        (line as CartLine).qty > 0,
    )
  } catch {
    return []
  }
}

type CartContextValue = {
  lines: CartLine[]
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  cartCount: number
  cartTotal: number
  bagPulse: number
  addToCart: (id: number, size: string, source?: HTMLElement | null) => void
  adjustQty: (key: string, delta: number) => void
  clearCart: () => void
  registerBagAnchor: (el: HTMLElement | null) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function ArkeCartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart)
  const [cartOpen, setCartOpen] = useState(false)
  const [flyItems, setFlyItems] = useState<FlyItem[]>([])
  const [bagPulse, setBagPulse] = useState(0)
  const bagAnchorRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines])

  const cartCount = lines.reduce((sum, line) => sum + line.qty, 0)
  const cartTotal = lines.reduce((sum, line) => {
    const product = products.find((p) => p.id === line.productId)
    return sum + (product ? product.price * line.qty : 0)
  }, 0)

  const registerBagAnchor = useCallback((el: HTMLElement | null) => {
    bagAnchorRef.current = el
  }, [])

  const removeFlyItem = useCallback((key: string) => {
    setFlyItems((prev) => prev.filter((item) => item.key !== key))
    setBagPulse((n) => n + 1)
  }, [])

  const addToCart = useCallback((id: number, size: string, source?: HTMLElement | null) => {
    const product = products.find((p) => p.id === id)
    if (!product || !size) return

    const key = cartLineKey(id, size)
    setLines((prev) => {
      const existing = prev.find((line) => line.key === key)
      if (existing) {
        return prev.map((line) =>
          line.key === key ? { ...line, qty: line.qty + 1 } : line,
        )
      }
      return [...prev, { key, productId: id, size, qty: 1 }]
    })

    const bag = bagAnchorRef.current
    if (source && bag) {
      setFlyItems((prev) => [
        ...prev,
        {
          key: `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          image: product.image,
          name: product.name,
          from: source.getBoundingClientRect(),
          to: bag.getBoundingClientRect(),
        },
      ])
    } else {
      setBagPulse((n) => n + 1)
    }
  }, [])

  const adjustQty = useCallback((key: string, delta: number) => {
    setLines((prev) => {
      const next = prev
        .map((line) =>
          line.key === key ? { ...line, qty: line.qty + delta } : line,
        )
        .filter((line) => line.qty > 0)
      return next
    })
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const value = useMemo(
    () => ({
      lines,
      cartOpen,
      setCartOpen,
      cartCount,
      cartTotal,
      bagPulse,
      addToCart,
      adjustQty,
      clearCart,
      registerBagAnchor,
    }),
    [
      lines,
      cartOpen,
      cartCount,
      cartTotal,
      bagPulse,
      addToCart,
      adjustQty,
      clearCart,
      registerBagAnchor,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
      <ArkeFlyToBag items={flyItems} onComplete={removeFlyItem} />
    </CartContext.Provider>
  )
}

export function useArkeCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useArkeCart must be used within ArkeCartProvider")
  return ctx
}
