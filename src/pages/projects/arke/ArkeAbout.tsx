import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import ArkePattern from "../ArkePattern"
import { ARKE_COLLECTIONS } from "./arkeData"
import { arkeHistory } from "./arkeAboutContent"

export default function ArkeAbout() {
  return (
    <>
      <section className="border-b-2 border-black bg-black px-6 py-16 text-white md:py-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden border-2 border-white/20 p-8 md:p-14">
          <ArkePattern className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-10" />
          <div className="absolute inset-0 arke-holo-overlay opacity-20" />
          <div className="relative">
            <p className="text-xs font-black uppercase tracking-[0.45em] text-white/45">Our story</p>
            <h1 className="mt-4 text-4xl font-black leading-[0.95] tracking-tight md:text-5xl lg:text-6xl">
              The history of <span className="arke-holo-text-light">ARKĒ</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg">
              {arkeHistory.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Origins</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-black md:text-4xl">
              Where it started
            </h2>
            <p className="mt-6 text-base leading-relaxed text-black/60 md:text-lg">{arkeHistory.intro}</p>
            <div className="mt-8 border-l-4 border-black pl-6">
              <p className="text-xs font-black uppercase tracking-widest text-black/45">The name</p>
              <p className="mt-3 text-sm leading-relaxed text-black/60 md:text-base">
                {arkeHistory.nameOrigin}
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden border-2 border-black bg-[#fafafa] p-8 md:p-10">
            <ArkePattern className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 text-black opacity-15" />
            <p className="text-xs font-black uppercase tracking-widest text-black/45">At a glance</p>
            <dl className="mt-6 space-y-5">
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-black/40">Founded</dt>
                <dd className="mt-1 text-lg font-black">2024 · Concept</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-black/40">Launch</dt>
                <dd className="mt-1 text-lg font-black">Early 2026 · Online store</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-black/40">Home base</dt>
                <dd className="mt-1 text-lg font-black">Philippines</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black uppercase tracking-widest text-black/40">Signature</dt>
                <dd className="mt-1 text-lg font-black">Pearl, black & holo accents</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-black bg-[#fafafa] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Timeline</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-black md:text-4xl">
            How ARKĒ grew
          </h2>

          <ol className="relative mt-12 space-y-0">
            {arkeHistory.milestones.map((item, i) => (
              <motion.li
                key={item.year + item.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="relative grid gap-4 border-t-2 border-black py-10 md:grid-cols-[7rem_1fr] md:gap-10"
              >
                <p className="text-sm font-black uppercase tracking-widest text-black/45">{item.year}</p>
                <div>
                  <h3 className="text-xl font-black text-black md:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/60 md:text-base">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Philosophy</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-black md:text-4xl">
            What we stand for
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {arkeHistory.philosophy.map((value, i) => (
              <div
                key={value.title}
                className={`border-2 border-black p-6 md:p-8 ${
                  i % 2 === 0 ? "bg-white text-black" : "bg-black text-white"
                }`}
              >
                <h3 className="text-lg font-black">{value.title}</h3>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    i % 2 === 0 ? "text-black/60" : "text-white/75"
                  }`}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-16 text-center text-white">
        <div className="mx-auto max-w-2xl">
          <p className="text-base leading-relaxed text-white/65 md:text-lg">{arkeHistory.closing}</p>
          <Link
            to={ARKE_COLLECTIONS}
            className="arke-holo-surface mt-10 inline-block border-2 border-white px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-white"
          >
            Explore the collection
          </Link>
        </div>
      </section>
    </>
  )
}
