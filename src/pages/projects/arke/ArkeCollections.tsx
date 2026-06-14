import { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import { Funnel } from "@phosphor-icons/react"
import ArkePattern from "../ArkePattern"
import ArkeProductImage from "../ArkeProductImage"
import ArkeFavoriteButton from "./ArkeFavoriteButton"
import { useArkeCart } from "./ArkeCartContext"
import { useArkeFavorites } from "./ArkeFavoritesContext"
import { categories, getProductUrl, products, type ArkeCategory } from "./arkeData"
import { formatArkePrice } from "./arkeUtils"

export default function ArkeCollections() {
  const [searchParams] = useSearchParams()
  const tagFilter = searchParams.get("tag")
  const [activeCategory, setActiveCategory] = useState<ArkeCategory>("All")
  const { addToCart } = useArkeCart()
  const { isFavorite } = useArkeFavorites()

  useEffect(() => {
    setActiveCategory("All")
  }, [tagFilter])

  const filtered = products.filter((p) => {
    if (tagFilter && p.tag !== tagFilter) return false
    if (activeCategory !== "All" && p.category !== activeCategory) return false
    return true
  })

  return (
    <>
      <section className="border-b-2 border-black bg-[#fafafa] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden border-2 border-black bg-white p-8 md:p-12">
            <ArkePattern className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-black opacity-15 md:h-56 md:w-56" />
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">
              {tagFilter ? `${tagFilter} arrivals` : "Spring / Summer 2026"}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-black md:text-5xl lg:text-6xl">
              {tagFilter ? "New Arrivals" : "Collections"}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
              {tagFilter
                ? "Fresh drops from the latest ARKĒ season — limited pieces with signature detailing."
                : "The full ARKĒ lineup — curated essentials and statement pieces across tops, bottoms, outerwear, and accessories."}
            </p>
            <p className="mt-2 text-sm font-bold uppercase tracking-widest text-black/40">
              {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Funnel size={18} weight="bold" className="text-black/40" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "border-2 border-black/15 bg-white text-black/50 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden border-2 border-black bg-white"
            >
              <div className="relative">
                <Link to={getProductUrl(product.slug)} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#ececec]">
                    <ArkeProductImage
                      name={product.name}
                      visual={product.visual}
                      image={product.image}
                      modelImage={product.modelImage}
                      className="relative z-0"
                    />
                    {product.tag && (
                      <span className="absolute left-0 top-0 z-10 bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <div className="border-t-2 border-black bg-black p-5 text-white transition-colors group-hover:bg-black/90">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                      {product.category}
                    </p>
                    <h2 className="mt-1 font-black">{product.name}</h2>
                    <p className="mt-3 text-xl font-black">{formatArkePrice(product.price)}</p>
                  </div>
                </Link>
                <div
                  className={`absolute right-3 top-3 z-20 rounded-full border-2 border-black bg-white shadow-sm transition-opacity ${
                    isFavorite(product.id)
                      ? "opacity-100"
                      : "opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  }`}
                >
                  <ArkeFavoriteButton productId={product.id} />
                </div>
              </div>
              <div className="border-t border-white/20 bg-black px-5 pb-5">
                <button
                  type="button"
                  onClick={(e) => addToCart(product.id, e.currentTarget)}
                  className="arke-holo-surface min-h-11 w-full border border-white/30 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:border-white"
                >
                  Add to Bag
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center text-sm text-black/40">
            No pieces in this category yet.
          </p>
        )}
      </main>
    </>
  )
}
