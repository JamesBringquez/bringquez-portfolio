import { useEffect, useMemo, useRef } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import { getProductUrl, searchProducts } from "./arkeData"
import { formatArkePrice } from "./arkeUtils"

type ArkeSearchPanelProps = {
  open: boolean
  query: string
  onQueryChange: (value: string) => void
  onClose: () => void
}

export default function ArkeSearchPanel({
  open,
  query,
  onQueryChange,
  onClose,
}: ArkeSearchPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const results = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-20 sm:pt-24">
          <button
            type="button"
            aria-label="Close search"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.32, 0.08, 0.24, 1] }}
            className="relative flex max-h-[min(70vh,560px)] w-full max-w-2xl flex-col overflow-hidden border-2 border-black bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            <div className="flex items-center gap-3 border-b-2 border-black px-4 py-3 sm:px-5">
              <MagnifyingGlass size={20} weight="bold" className="shrink-0 text-black/40" />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search pieces, categories, materials…"
                className="min-w-0 flex-1 bg-transparent text-sm font-medium text-black outline-none placeholder:text-black/35 sm:text-base"
                aria-label="Search products"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close search"
                className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-black/15 transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="overflow-y-auto px-2 py-2 sm:px-3">
              {query.trim() === "" ? (
                <div className="px-3 py-8 text-center">
                  <p className="text-sm font-bold text-black/50">Search the ARKĒ collection</p>
                  <p className="mt-2 text-xs text-black/35">
                    Try &ldquo;hoodie&rdquo;, &ldquo;tops&rdquo;, &ldquo;cotton&rdquo;, or &ldquo;new&rdquo;
                  </p>
                  <p className="mt-4 hidden text-[10px] font-bold uppercase tracking-widest text-black/25 sm:block">
                    Press Esc to close · Ctrl+K to open
                  </p>
                </div>
              ) : results.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-black/40">
                  No pieces match &ldquo;{query.trim()}&rdquo;
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((product, i) => (
                    <motion.li
                      key={product.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <Link
                        to={getProductUrl(product.slug)}
                        onClick={onClose}
                        className="flex items-center gap-3 border border-transparent px-3 py-3 transition-colors hover:border-black hover:bg-[#fafafa]"
                      >
                        <div className="h-16 w-14 shrink-0 overflow-hidden border border-black/10 bg-[#ececec]">
                          <ArkeProductImage
                            name={product.name}
                            visual={product.visual}
                            image={product.image}
                            modelImage={product.modelImage}
                            className="!h-full !min-h-0"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                            {product.category}
                            {product.tag ? ` · ${product.tag}` : ""}
                          </p>
                          <p className="font-black text-black">{product.name}</p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-black/45">
                            {product.description}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm font-black text-black">
                          {formatArkePrice(product.price)}
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {query.trim() !== "" && results.length > 0 && (
              <div className="border-t border-black/10 px-5 py-3 text-center text-[10px] font-bold uppercase tracking-widest text-black/35">
                {results.length} {results.length === 1 ? "result" : "results"}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
