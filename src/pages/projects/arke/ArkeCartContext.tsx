import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { products } from "./arkeData"
import ArkeFlyToBag, { type FlyItem } from "./ArkeFlyToBag"

type CartContextValue = {
  cart: Record<number, number>
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  cartCount: number
  cartTotal: number
  bagPulse: number
  addToCart: (id: number, source?: HTMLElement | null) => void
  adjustQty: (id: number, delta: number) => void
  registerBagAnchor: (el: HTMLElement | null) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function ArkeCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [flyItems, setFlyItems] = useState<FlyItem[]>([])
  const [bagPulse, setBagPulse] = useState(0)
  const bagAnchorRef = useRef<HTMLElement | null>(null)

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = products.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0)

  const registerBagAnchor = useCallback((el: HTMLElement | null) => {
    bagAnchorRef.current = el
  }, [])

  const removeFlyItem = useCallback((key: string) => {
    setFlyItems((prev) => prev.filter((item) => item.key !== key))
    setBagPulse((n) => n + 1)
  }, [])

  const addToCart = useCallback((id: number, source?: HTMLElement | null) => {
    const product = products.find((p) => p.id === id)
    if (!product) return

    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))

    const bag = bagAnchorRef.current
    if (source && bag) {
      setFlyItems((prev) => [
        ...prev,
        {
          key: `${id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          image: product.image,
          name: product.name,
          from: source.getBoundingClientRect(),
          to: bag.getBoundingClientRect(),
        },
      ])
    }
  }, [])

  const adjustQty = useCallback((id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }, [])

  const value = useMemo(
    () => ({
      cart,
      cartOpen,
      setCartOpen,
      cartCount,
      cartTotal,
      bagPulse,
      addToCart,
      adjustQty,
      registerBagAnchor,
    }),
    [cart, cartOpen, cartCount, cartTotal, bagPulse, addToCart, adjustQty, registerBagAnchor],
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
