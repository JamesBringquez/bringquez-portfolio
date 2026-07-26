import { useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, CaretRight, Star, Truck } from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import ArkeFavoriteButton from "./ArkeFavoriteButton"
import { useArkeCart } from "./ArkeCartContext"
import {
  ARKE_COLLECTIONS,
  getProductBySlug,
  getProductUrl,
  getReviewsForProduct,
  products,
} from "./arkeData"
import { ARKE_FREE_SHIPPING_MIN, formatArkePrice } from "./arkeUtils"

export default function ArkeProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined
  const { addToCart, setCartOpen, cartTotal } = useArkeCart()
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeError, setSizeError] = useState(false)
  const [showProductShot, setShowProductShot] = useState(false)
  const [addedFlash, setAddedFlash] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)

  useEffect(() => {
    setSelectedSize(null)
    setSizeError(false)
    setShowProductShot(false)
    setAddedFlash(false)
    setGuideOpen(false)
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!product) {
    return <Navigate to={ARKE_COLLECTIONS} replace />
  }

  const needsSize = product.sizes.length > 1
  const productReviews = getReviewsForProduct(product.name)
  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3)
  const remainingForShipping = Math.max(0, ARKE_FREE_SHIPPING_MIN - cartTotal)

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    const size = needsSize ? selectedSize : product.sizes[0]
    if (!size) {
      setSizeError(true)
      return
    }
    addToCart(product.id, size, e.currentTarget)
    setAddedFlash(true)
    window.setTimeout(() => {
      setAddedFlash(false)
      setCartOpen(true)
    }, 450)
  }

  return (
    <>
      <div className="border-b border-black/10 bg-[#fafafa] px-4 py-3 sm:px-6">
        <nav className="mx-auto flex max-w-6xl items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/45">
          <Link to={ARKE_COLLECTIONS} className="transition-colors hover:text-black">
            Collections
          </Link>
          <CaretRight size={12} weight="bold" />
          <span className="text-black/35">{product.category}</span>
          <CaretRight size={12} weight="bold" />
          <span className="truncate text-black">{product.name}</span>
        </nav>
      </div>

      <main className="mx-auto max-w-6xl px-4 py-10 pb-28 sm:px-6 md:py-14 md:pb-14">
        <Link
          to={ARKE_COLLECTIONS}
          className="mb-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/50 transition-colors hover:text-black"
        >
          <ArrowLeft size={16} weight="bold" />
          Back to collections
        </Link>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden border-2 border-black"
          >
            <div className="absolute right-3 top-3 z-20 rounded-full border-2 border-black bg-white shadow-sm">
              <ArkeFavoriteButton productId={product.id} size={22} />
            </div>
            <div className="group relative aspect-[4/5] bg-[#ececec]">
              {showProductShot ? (
                <img
                  src={product.image}
                  alt={`${product.name} — product`}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                <ArkeProductImage
                  name={product.name}
                  visual={product.visual}
                  image={product.image}
                  modelImage={product.modelImage}
                  className="h-full w-full"
                />
              )}
            </div>
            <div className="flex border-t-2 border-black">
              <button
                type="button"
                onClick={() => setShowProductShot(false)}
                className={`flex-1 py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  !showProductShot ? "bg-black text-white" : "bg-white text-black/50 hover:text-black"
                }`}
              >
                On model
              </button>
              <button
                type="button"
                onClick={() => setShowProductShot(true)}
                className={`flex-1 border-l-2 border-black py-3 text-xs font-black uppercase tracking-wider transition-colors ${
                  showProductShot ? "bg-black text-white" : "bg-white text-black/50 hover:text-black"
                }`}
              >
                Product
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            {product.tag && (
              <span className="inline-block bg-black px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                {product.tag}
              </span>
            )}
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.35em] text-black/40">
              {product.category}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-black md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-black text-black">{formatArkePrice(product.price)}</p>
            <p className="mt-6 leading-relaxed text-black/60">{product.description}</p>
            <p className="mt-3 text-sm text-black/45">{product.designNote}</p>

            <div className="mt-6 flex items-start gap-2 border border-black/10 bg-[#fafafa] px-4 py-3 text-sm text-black/55">
              <Truck size={18} weight="bold" className="mt-0.5 shrink-0 text-black" />
              <p>
                {remainingForShipping > 0 ? (
                  <>
                    You&apos;re{" "}
                    <span className="font-bold text-black">
                      {formatArkePrice(remainingForShipping)}
                    </span>{" "}
                    away from free shipping (orders over {formatArkePrice(ARKE_FREE_SHIPPING_MIN)}).
                  </>
                ) : (
                  <>Your bag already qualifies for free shipping.</>
                )}
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-black uppercase tracking-widest text-black/50">Size</p>
                <button
                  type="button"
                  onClick={() => setGuideOpen((v) => !v)}
                  className="text-[11px] font-bold uppercase tracking-wider text-black/45 underline-offset-2 hover:text-black hover:underline"
                >
                  {guideOpen ? "Hide size guide" : "Size guide"}
                </button>
              </div>
              {sizeError && (
                <p className="mt-2 text-xs font-bold text-red-600" role="alert">
                  Please select a size
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size)
                      setSizeError(false)
                    }}
                    className={`min-h-11 min-w-11 border-2 px-4 py-2 text-sm font-bold transition-colors ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-black/20 bg-white text-black hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {guideOpen && (
                <div className="mt-4 border-2 border-black/10 bg-white p-4 text-sm text-black/60">
                  <p className="font-bold text-black">Fit tip</p>
                  <p className="mt-1">{product.fit}</p>
                  <p className="mt-3 text-xs text-black/45">
                    Sizes are approximate for this demo. In a live store this would include a full
                    measurement chart (chest, waist, length).
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 hidden flex-wrap items-center gap-4 md:flex">
              <button
                type="button"
                onClick={handleAddToCart}
                className="arke-holo-surface min-w-[12rem] border-2 border-black px-10 py-4 text-sm font-black uppercase tracking-widest text-black"
              >
                {addedFlash ? "Added ✓" : "Add to Bag"}
              </button>
              <div className="flex items-center gap-2 border-2 border-black/15 px-3 py-2">
                <ArkeFavoriteButton productId={product.id} size={22} className="h-9 w-9" />
                <span className="text-xs font-bold uppercase tracking-wider text-black/45">Save</span>
              </div>
            </div>

            <dl className="mt-10 space-y-4 border-t-2 border-black/10 pt-8">
              <div>
                <dt className="text-xs font-black uppercase tracking-widest text-black/40">Material</dt>
                <dd className="mt-1 text-sm text-black/70">{product.material}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-widest text-black/40">Fit</dt>
                <dd className="mt-1 text-sm text-black/70">{product.fit}</dd>
              </div>
              <div>
                <dt className="text-xs font-black uppercase tracking-widest text-black/40">Care</dt>
                <dd className="mt-1 text-sm text-black/70">
                  Cold wash inside out · hang dry · do not bleach
                </dd>
              </div>
            </dl>

            {productReviews.length > 0 && (
              <div className="mt-10 border-t-2 border-black/10 pt-8">
                <p className="text-xs font-black uppercase tracking-widest text-black/40">
                  Concept reviews
                </p>
                {productReviews.map((review) => (
                  <blockquote key={review.id} className="mt-4 border-l-2 border-black pl-4">
                    <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} size={14} weight="fill" className="text-black" />
                      ))}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-black/65">{review.quote}</p>
                    <footer className="mt-2 text-xs font-bold text-black/45">
                      {review.name} · {review.location}
                    </footer>
                  </blockquote>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t-2 border-black pt-12 md:mt-20">
            <h2 className="text-xl font-black uppercase tracking-wider text-black">
              You may also like
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={getProductUrl(item.slug)}
                  className="group flex gap-4 border-2 border-black bg-white p-4 transition-colors hover:bg-black hover:text-white"
                >
                  <div className="h-24 w-20 shrink-0 overflow-hidden border border-black/10 bg-[#ececec]">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                      {item.category}
                    </p>
                    <p className="font-black">{item.name}</p>
                    <p className="mt-1 text-sm font-black">{formatArkePrice(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky mobile purchase bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-black bg-white p-3 md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-black">{product.name}</p>
            <p className="text-xs font-bold text-black/50">
              {selectedSize ? `Size ${selectedSize}` : "Select a size"} ·{" "}
              {formatArkePrice(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="arke-holo-surface shrink-0 border-2 border-black px-5 py-3 text-xs font-black uppercase tracking-widest text-black"
          >
            {addedFlash ? "Added ✓" : "Add to Bag"}
          </button>
        </div>
      </div>
    </>
  )
}
