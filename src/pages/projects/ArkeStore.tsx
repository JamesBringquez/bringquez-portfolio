import { Link } from "react-router-dom"
import ArkeLookbook from "./arke/ArkeLookbook"
import ArkeReviews from "./arke/ArkeReviews"
import ArkeHeroShowcase from "./arke/ArkeHeroShowcase"
import { ARKE_ABOUT, ARKE_COLLECTIONS } from "./arke/arkeData"
import { formatArkePrice, ARKE_FREE_SHIPPING_MIN } from "./arke/arkeUtils"

export default function ArkeStore() {
  return (
    <>
      <ArkeHeroShowcase />

      <section className="border-b-2 border-black bg-black px-6 py-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-white/45">
          Free shipping on orders over {formatArkePrice(ARKE_FREE_SHIPPING_MIN)} · Easy returns within 30 days
        </p>
      </section>

      <section className="border-b-2 border-black bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="arke-holo-text text-3xl font-black tracking-[0.2em]">ARKĒ</h2>
          <p className="mt-4 text-lg leading-relaxed text-black/55">
            We believe clothing should feel intentional — quality materials, thoughtful cuts, and
            details that catch the light. Browse the full collection and find your next everyday
            favorite.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to={ARKE_COLLECTIONS}
              className="inline-block border-2 border-black px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
            >
              View Collections
            </Link>
            <Link
              to={ARKE_ABOUT}
              className="inline-block border-2 border-black/15 px-8 py-3 text-xs font-black uppercase tracking-widest text-black/55 transition-colors hover:border-black hover:text-black"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <ArkeLookbook />

      <ArkeReviews />
    </>
  )
}
