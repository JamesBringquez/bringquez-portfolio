import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { Heart, ShoppingBag } from "@phosphor-icons/react"
import ArkePattern from "../ArkePattern"
import ArkeProductImage from "../ArkeProductImage"
import ArkeFavoriteButton from "./ArkeFavoriteButton"
import { useArkeCart } from "./ArkeCartContext"
import { useArkeFavorites } from "./ArkeFavoritesContext"
import { ARKE_COLLECTIONS, getProductUrl } from "./arkeData"
import { formatArkePrice } from "./arkeUtils"

export default function ArkeFavorites() {
  const { favoriteProducts } = useArkeFavorites()
  const { addToCart } = useArkeCart()

  return (
    <>
      <section className="border-b-2 border-black bg-[#fafafa] px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden border-2 border-black bg-white p-8 md:p-12"
          >
            <ArkePattern className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 text-black opacity-15 md:h-56 md:w-56" />
            <motion.div
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.15 }}
              className="mb-4 inline-flex h-12 w-12 items-center justify-center border-2 border-black bg-black text-white"
            >
              <Heart size={24} weight="fill" />
            </motion.div>
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Saved pieces</p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-black md:text-5xl lg:text-6xl">
              Favorites
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-black/55 md:text-lg">
              Your curated shortlist — pieces you want to come back to. Saved locally in this demo so
              they stay put between visits.
            </p>
            <motion.p
              key={favoriteProducts.length}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm font-bold uppercase tracking-widest text-black/40"
            >
              {favoriteProducts.length} {favoriteProducts.length === 1 ? "piece" : "pieces"}
            </motion.p>
          </motion.div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14">
        {favoriteProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col items-center border-2 border-dashed border-black/20 px-6 py-20 text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Heart size={48} weight="regular" className="text-black/20" />
            </motion.div>
            <p className="mt-6 text-lg font-black text-black">No favorites yet</p>
            <p className="mt-2 max-w-sm text-sm text-black/45">
              Tap the heart on any piece in Collections to save it here.
            </p>
            <Link
              to={ARKE_COLLECTIONS}
              className="mt-8 inline-block border-2 border-black bg-black px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Browse Collections
            </Link>
          </motion.div>
        ) : (
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {favoriteProducts.map((product, i) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.88, x: -40, transition: { duration: 0.3 } }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 320, damping: 28 }}
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
                          className="relative z-0 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        {product.tag && (
                          <span className="absolute left-0 top-0 z-10 bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                            {product.tag}
                          </span>
                        )}
                      </div>
                      <div className="border-t-2 border-black bg-black p-5 text-white">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                          {product.category}
                        </p>
                        <h2 className="mt-1 font-black">{product.name}</h2>
                        <p className="mt-3 text-xl font-black">{formatArkePrice(product.price)}</p>
                      </div>
                    </Link>
                    <div className="absolute right-3 top-3 z-20 rounded-full border-2 border-black bg-white shadow-sm">
                      <ArkeFavoriteButton productId={product.id} />
                    </div>
                  </div>
                  <div className="flex border-t border-white/20 bg-black">
                    <button
                      type="button"
                      onClick={(e) => addToCart(product.id, e.currentTarget)}
                      className="arke-holo-surface flex min-h-11 flex-1 items-center justify-center gap-2 border-r border-white/20 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:border-white"
                    >
                      <ShoppingBag size={16} weight="bold" />
                      Add to Bag
                    </button>
                    <Link
                      to={getProductUrl(product.slug)}
                      className="flex min-h-11 flex-1 items-center justify-center px-4 py-2.5 text-xs font-black uppercase tracking-wider text-white/70 transition-colors hover:text-white"
                    >
                      View
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </>
  )
}
