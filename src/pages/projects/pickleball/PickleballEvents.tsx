import { motion } from "framer-motion"
import { Calendar, Clock, Users } from "@phosphor-icons/react"
import { events } from "./pickleballData"

const typeColors = {
  "Open Play": "bg-emerald-100 text-emerald-800",
  Clinic: "bg-blue-100 text-blue-800",
  Social: "bg-orange-100 text-orange-800",
  Tournament: "bg-purple-100 text-purple-800",
} as const

export default function PickleballEvents() {
  return (
    <>
      <section className="border-b border-emerald-100 bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#16a34a]">Community</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Events & open play
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Weekly sessions, beginner clinics, social rallies, and local tournaments — something for
            every player in the Alabang pickleball scene.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="space-y-4">
          {events.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm md:p-8"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${typeColors[event.type]}`}
                  >
                    {event.type}
                  </span>
                  <h2 className="mt-3 text-xl font-black text-slate-900 md:text-2xl">
                    {event.title}
                  </h2>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} weight="bold" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} weight="bold" />
                      {event.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users size={16} weight="bold" />
                      {event.spots}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl leading-relaxed text-slate-600">{event.description}</p>
                </div>
                <button
                  type="button"
                  className="shrink-0 rounded-full border-2 border-[#16a34a] px-6 py-2.5 text-sm font-bold text-[#16a34a] transition-colors hover:bg-[#16a34a] hover:text-white"
                >
                  RSVP
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-500">
          Demo only — RSVP buttons are placeholders in this draft concept.
        </p>
      </main>
    </>
  )
}
