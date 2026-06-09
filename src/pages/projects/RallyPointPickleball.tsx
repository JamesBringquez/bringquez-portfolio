import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import {
  Calendar,
  UsersThree,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react"
import {
  RALLY_COMMUNITY,
  RALLY_COURTS,
  RALLY_EVENTS,
  RALLY_HERO,
  RALLY_JOIN,
  events,
  rallyAmenities,
  rallyInfo,
  rallyStats,
} from "./pickleball/pickleballData"

export default function RallyPointPickleball() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#14532d] text-white">
        <div className="absolute inset-0">
          <img
            src={RALLY_HERO}
            alt={`${rallyInfo.name} courts in ${rallyInfo.location}`}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#14532d]/95 via-[#14532d]/80 to-[#14532d]/50" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="inline-block rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-200">
              Draft concept · {rallyInfo.city}
            </span>
            <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              {rallyInfo.tagline}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75">
              A community hub for pickleball players in Filinvest, Alabang — book courts, join open
              play, and connect with players at every skill level.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={RALLY_JOIN}
                className="inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#15803d]"
              >
                Join the club
                <ArrowRight size={18} weight="bold" />
              </Link>
              <Link
                to={RALLY_EVENTS}
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              >
                View events
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-emerald-100 bg-white py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6">
          {rallyStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl font-black text-[#16a34a] md:text-4xl">{stat.value}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#16a34a]">
              Our place
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 md:text-4xl">
              Built for the Alabang pickleball community
            </h2>
            <p className="mt-5 leading-relaxed text-slate-600">
              Rally Point started as a small group of friends who wanted a dedicated place to play
              near Filinvest. Today it&apos;s a growing club with outdoor and covered courts, weekly
              open play, and a welcoming scene for beginners and competitive players alike.
            </p>
            <ul className="mt-8 space-y-3">
              {rallyAmenities.slice(0, 4).map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={18} weight="fill" className="shrink-0 text-[#16a34a]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to={RALLY_COURTS}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#16a34a] hover:text-[#15803d]"
            >
              Explore our courts
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-emerald-100 shadow-xl shadow-emerald-900/5"
          >
            <img
              src={RALLY_COMMUNITY}
              alt="Pickleball community at Rally Point"
              className="aspect-[4/3] w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-emerald-50/50 px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#16a34a]">
                Upcoming
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900">
                Events & open play
              </h2>
            </div>
            <Link
              to={RALLY_EVENTS}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#16a34a]"
            >
              See all events
              <ArrowRight size={16} weight="bold" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {events.slice(0, 2).map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <span className="inline-block rounded-full bg-[#16a34a]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#15803d]">
                  {event.type}
                </span>
                <h3 className="mt-3 text-lg font-black text-slate-900">{event.title}</h3>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={16} weight="bold" />
                  {event.date} · {event.time}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{event.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#14532d] px-8 py-12 text-center text-white md:px-16 md:py-16">
          <UsersThree size={40} weight="duotone" className="mx-auto text-[#4ade80]" />
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Ready to rally?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-white/70">
            Whether you&apos;re picking up a paddle for the first time or looking for regular doubles
            partners, Rally Point is your home court in Alabang.
          </p>
          <Link
            to={RALLY_JOIN}
            className="mt-8 inline-block rounded-full bg-[#f97316] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#ea580c]"
          >
            Start your membership
          </Link>
        </div>
      </section>
    </>
  )
}
