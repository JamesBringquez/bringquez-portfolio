import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import { products } from "./arkeData"

type CartContextValue = {
  cart: Record<number, number>
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  cartCount: number
  cartTotal: number
  addToCart: (id: number) => void
  adjustQty: (id: number, delta: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function ArkeCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = products.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0)

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }

  const adjustQty = (id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  const value = useMemo(
    () => ({
      cart,
      cartOpen,
      setCartOpen,
      cartCount,
      cartTotal,
      addToCart,
      adjustQty,
    }),
    [cart, cartOpen, cartCount, cartTotal],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useArkeCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useArkeCart must be used within ArkeCartProvider")
  return ctx
}
