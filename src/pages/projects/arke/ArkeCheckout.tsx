import { useMemo, useState, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { motion } from "motion/react"
import { CheckCircle, Lock, ShoppingBag } from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import { useArkeCart } from "./ArkeCartContext"
import { ARKE_COLLECTIONS, products } from "./arkeData"
import { ARKE_FREE_SHIPPING_MIN, formatArkePrice } from "./arkeUtils"

export default function ArkeCheckout() {
  const { lines, cartCount, cartTotal, clearCart } = useArkeCart()
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const lineDetails = useMemo(
    () =>
      lines
        .map((line) => {
          const product = products.find((p) => p.id === line.productId)
          if (!product) return null
          return { line, product }
        })
        .filter(Boolean) as {
        line: (typeof lines)[number]
        product: (typeof products)[number]
      }[],
    [lines],
  )

  const shipping = cartTotal >= ARKE_FREE_SHIPPING_MIN ? 0 : 150
  const total = cartTotal + shipping

  if (cartCount === 0 && !placed) {
    return <Navigate to={ARKE_COLLECTIONS} replace />
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const id = `ARKĒ-${Date.now().toString().slice(-6)}`
    setOrderId(id)
    setPlaced(true)
    clearCart()
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16 text-center md:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-2 border-black bg-white p-8 md:p-12"
        >
          <CheckCircle size={48} weight="fill" className="mx-auto text-black" />
          <h1 className="mt-6 text-3xl font-black tracking-tight text-black md:text-4xl">
            Order confirmed
          </h1>
          <p className="mt-3 text-sm text-black/50">
            Demo confirmation only — no payment was taken.
          </p>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.35em] text-black/40">
            Order {orderId}
          </p>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-black/60">
            Thanks for walking through the ARKĒ checkout experience. In a live store, this is where
            shipping updates and a receipt email would land.
          </p>
          <Link
            to={ARKE_COLLECTIONS}
            className="mt-8 inline-block border-2 border-black bg-black px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-black"
          >
            Continue shopping
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14">
      <div className="mb-8 flex items-center gap-3">
        <ShoppingBag size={22} weight="bold" />
        <div>
          <p className="text-xs font-black uppercase tracking-[0.35em] text-black/40">Checkout</p>
          <h1 className="text-3xl font-black tracking-tight text-black md:text-4xl">
            Almost yours
          </h1>
        </div>
      </div>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
          <section className="border-2 border-black p-5 md:p-6">
            <h2 className="text-sm font-black uppercase tracking-widest">Contact</h2>
            <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-black/45">
              Email
              <input
                required
                type="email"
                name="email"
                placeholder="you@email.com"
                className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium text-black outline-none focus:border-black"
              />
            </label>
          </section>

          <section className="border-2 border-black p-5 md:p-6">
            <h2 className="text-sm font-black uppercase tracking-widest">Shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45 sm:col-span-1">
                First name
                <input
                  required
                  name="firstName"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45">
                Last name
                <input
                  required
                  name="lastName"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45 sm:col-span-2">
                Address
                <input
                  required
                  name="address"
                  placeholder="Street, barangay, city"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45">
                City
                <input
                  required
                  name="city"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45">
                Postal code
                <input
                  required
                  name="postal"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
            </div>
          </section>

          <section className="border-2 border-black p-5 md:p-6">
            <div className="flex items-center gap-2">
              <Lock size={16} weight="bold" />
              <h2 className="text-sm font-black uppercase tracking-widest">Payment</h2>
            </div>
            <p className="mt-3 text-sm text-black/50">
              Demo mode — enter any card details. Nothing is charged or stored.
            </p>
            <label className="mt-4 block text-xs font-bold uppercase tracking-wider text-black/45">
              Card number
              <input
                required
                name="card"
                placeholder="4242 4242 4242 4242"
                className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45">
                Expiry
                <input
                  required
                  name="expiry"
                  placeholder="MM/YY"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
              <label className="block text-xs font-bold uppercase tracking-wider text-black/45">
                CVC
                <input
                  required
                  name="cvc"
                  placeholder="123"
                  className="mt-2 w-full border-2 border-black/15 px-4 py-3 text-sm font-medium outline-none focus:border-black"
                />
              </label>
            </div>
          </section>

          <button
            type="submit"
            className="arke-holo-surface w-full border-2 border-black py-4 text-sm font-black uppercase tracking-widest text-black"
          >
            Place demo order · {formatArkePrice(total)}
          </button>
        </form>

        <aside className="border-2 border-black bg-[#fafafa] p-5 lg:col-span-2 md:p-6">
          <h2 className="text-sm font-black uppercase tracking-widest">Order summary</h2>
          <ul className="mt-5 space-y-4">
            {lineDetails.map(({ line, product }) => (
              <li key={line.key} className="flex gap-3">
                <div className="h-16 w-12 shrink-0 overflow-hidden border border-black/10 bg-white">
                  <ArkeProductImage
                    name={product.name}
                    visual={product.visual}
                    image={product.image}
                    modelImage={product.modelImage}
                    className="!h-full !min-h-0"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold">{product.name}</p>
                  <p className="text-xs uppercase tracking-wider text-black/40">
                    Size {line.size} · Qty {line.qty}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-black">
                  {formatArkePrice(product.price * line.qty)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-black/10 pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-black/50">Subtotal</span>
              <span className="font-bold">{formatArkePrice(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black/50">Shipping</span>
              <span className="font-bold">
                {shipping === 0 ? "Free" : formatArkePrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 text-base font-black">
              <span>Total</span>
              <span>{formatArkePrice(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
