import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { X } from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import { useArkeCart } from "./ArkeCartContext"
import type { ArkeProduct } from "./arkeData"
import { formatArkePrice } from "./arkeUtils"

type ArkeQuickAddModalProps = {
  product: ArkeProduct | null
  open: boolean
  onClose: () => void
}

export default function ArkeQuickAddModal({ product, open, onClose }: ArkeQuickAddModalProps) {
  const { addToCart, setCartOpen } = useArkeCart()
  const [size, setSize] = useState<string | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!open || !product) return
    setSize(product.sizes.length === 1 ? product.sizes[0] : null)
    setError(false)
  }, [open, product])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!product) return null

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!size) {
      setError(true)
      return
    }
    addToCart(product.id, size, e.currentTarget)
    onClose()
    window.setTimeout(() => setCartOpen(true), 280)
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:px-4">
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Choose size for ${product.name}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.28, ease: [0.32, 0.08, 0.24, 1] }}
            className="relative w-full max-w-md border-2 border-black bg-white shadow-2xl sm:mb-0"
          >
            <div className="flex items-start gap-4 border-b-2 border-black p-4">
              <div className="h-24 w-20 shrink-0 overflow-hidden border border-black/10 bg-[#ececec]">
                <ArkeProductImage
                  name={product.name}
                  visual={product.visual}
                  image={product.image}
                  modelImage={product.modelImage}
                  className="!h-full !min-h-0"
                />
              </div>
              <div className="min-w-0 flex-1 pt-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                  {product.category}
                </p>
                <h2 className="mt-1 font-black text-black">{product.name}</h2>
                <p className="mt-1 text-lg font-black">{formatArkePrice(product.price)}</p>
                <p className="mt-2 text-xs text-black/45">{product.fit}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close size picker"
                className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black/15 hover:border-black hover:bg-black hover:text-white"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black uppercase tracking-widest text-black/50">
                  Select size
                </p>
                {error && (
                  <p className="text-xs font-bold text-red-600" role="alert">
                    Choose a size to continue
                  </p>
                )}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      setSize(option)
                      setError(false)
                    }}
                    className={`min-h-11 min-w-11 border-2 px-4 py-2 text-sm font-bold transition-colors ${
                      size === option
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black hover:border-black"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="arke-holo-surface mt-6 w-full border-2 border-black py-3.5 text-sm font-black uppercase tracking-widest text-black"
              >
                Add to Bag
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
