import { motion } from "framer-motion"
import { EnvelopeSimple, User, TennisBall } from "@phosphor-icons/react"
import { joinSteps, rallyInfo } from "./pickleballData"

export default function PickleballJoin() {
  return (
    <>
      <section className="border-b border-emerald-100 bg-white px-4 py-14 sm:px-6 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#16a34a]">Membership</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
            Join Rally Point
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-600">
            Become part of the Filinvest pickleball community — free to sign up, easy to book, and
            built for players who want a regular place to play.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            {joinSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
              >
                <span className="text-2xl font-black text-[#16a34a]/30">{step.step}</span>
                <div>
                  <h2 className="font-black text-slate-900">{step.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-emerald-100 bg-white p-8 shadow-sm"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#16a34a]/10">
                <TennisBall size={28} weight="duotone" className="text-[#16a34a]" />
              </div>
              <div>
                <p className="font-black text-slate-900">Create your profile</p>
                <p className="text-xs text-slate-500">Draft signup form</p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <User size={16} weight="bold" />
                  Full name
                </span>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <EnvelopeSimple size={16} weight="bold" />
                  Email
                </span>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 text-sm font-semibold text-slate-700">Skill level</span>
                <select className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-[#16a34a]/20">
                  <option>Beginner — new to pickleball</option>
                  <option>Intermediate — comfortable rallying</option>
                  <option>Advanced — competitive play</option>
                </select>
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-[#16a34a] py-3.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#15803d]"
              >
                Join waitlist
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-slate-400">
              {rallyInfo.draftNote} Form does not submit yet.
            </p>
          </motion.div>
        </div>
      </main>
    </>
  )
}
