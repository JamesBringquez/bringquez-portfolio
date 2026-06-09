import { motion } from "framer-motion"
import { Sun, CloudRain } from "@phosphor-icons/react"
import { courts, rallyAmenities } from "./pickleballData"

const statusStyles = {
  Open: "bg-emerald-100 text-emerald-800",
  Reserved: "bg-amber-100 text-amber-800",
  Maintenance: "bg-slate-100 text-slate-600",
} as const

export default function PickleballCourts() {
  return (
    <>
      <section className="border-b border-emerald-100 bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#16a34a]">Facilities</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Courts & schedule
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Six courts across outdoor and covered areas — sport acrylic surfaces maintained for
            consistent bounce and safe footwork in the Alabang heat.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courts.map((court, i) => (
            <motion.article
              key={court.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
            >
              <div
                className={`flex items-center justify-between px-5 py-4 ${
                  court.type === "Covered" ? "bg-slate-800 text-white" : "bg-[#16a34a] text-white"
                }`}
              >
                <span className="text-sm font-bold">{court.name}</span>
                {court.type === "Covered" ? (
                  <CloudRain size={20} weight="duotone" aria-hidden />
                ) : (
                  <Sun size={20} weight="duotone" aria-hidden />
                )}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {court.type}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${statusStyles[court.status]}`}
                  >
                    {court.status}
                  </span>
                </div>
                <p className="mt-3 text-sm text-slate-600">{court.surface}</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{court.hours}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-8">
          <h2 className="text-xl font-black text-slate-900">Amenities</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rallyAmenities.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#16a34a]" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
