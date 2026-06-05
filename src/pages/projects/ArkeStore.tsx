import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import ArkePattern from "./ArkePattern"
import ArkeReviews from "./arke/ArkeReviews"
import { ARKE_ABOUT, ARKE_COLLECTIONS } from "./arke/arkeData"

export default function ArkeStore() {
  return (
    <>
      <section className="grid min-h-[70vh] border-b-2 border-black md:grid-cols-2">
        <div className="arke-holo-surface relative flex flex-col justify-center px-6 py-16 md:px-12 md:py-24">
          <ArkePattern className="pointer-events-none absolute right-4 top-4 h-32 w-32 text-black md:right-8 md:top-8 md:h-40 md:w-40" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-lg"
          >
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">
              Spring / Summer 2026
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[0.92] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
              Elevated
              <br />
              <span className="arke-holo-text">everyday</span>
              <br />
              streetwear.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-black/55">
              ARKĒ is a modern clothing label — clean silhouettes, premium fabrics, and a
              signature holographic finish on select pieces. Designed for daily wear, built to
              stand out.
            </p>
            <Link
              to={`${ARKE_COLLECTIONS}?tag=New`}
              className="mt-10 inline-block border-2 border-black bg-black px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Shop New Arrivals
            </Link>
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center justify-center bg-black px-6 py-16 text-center">
          <ArkePattern className="h-48 w-48 text-white opacity-90 md:h-64 md:w-64" />
          <div className="absolute inset-0 arke-holo-overlay opacity-25" />
          <p className="relative z-10 mt-8 max-w-xs text-sm leading-relaxed text-white/50">
            Free shipping on orders over $150. Easy returns within 30 days.
          </p>
          <p className="arke-holo-text-light relative z-10 mt-6 text-4xl font-black tracking-[0.3em] md:text-5xl">
            ARKĒ
          </p>
        </div>
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

      <ArkeReviews />
    </>
  )
}
