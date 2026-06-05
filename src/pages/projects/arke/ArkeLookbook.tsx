import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { lookbookFeatured, lookbookHero, ARKE_COLLECTIONS } from "./arkeData"

export default function ArkeLookbook() {
  return (
    <section className="border-b-2 border-black bg-white px-6 py-16 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Lookbook</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-black md:text-4xl">
              Styled for the street
            </h2>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-black/55">
              ARKĒ pieces shot on model — clean silhouettes, everyday rotation, signature holo
              details in motion.
            </p>
          </div>
          <Link
            to={ARKE_COLLECTIONS}
            className="inline-block shrink-0 border-2 border-black px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white"
          >
            Shop the collection
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden border-2 border-black lg:col-span-7 lg:row-span-2"
          >
            <img
              src={lookbookHero}
              alt="ARKĒ lookbook campaign — models in streetwear"
              className="h-full min-h-[22rem] w-full object-cover object-center md:min-h-[28rem]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
            <p className="absolute bottom-0 left-0 p-6 text-sm font-black uppercase tracking-[0.35em] text-white">
              Spring / Summer 2026
            </p>
          </motion.div>

          {lookbookFeatured.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 * (i + 1) }}
              className="group relative overflow-hidden border-2 border-black lg:col-span-5"
            >
              <img
                src={item.modelImage}
                alt={`${item.name} — model lookbook`}
                className="aspect-[4/5] w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-black/80 px-4 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                  On model
                </p>
                <p className="text-sm font-black text-white">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
