import { motion } from "framer-motion"
import {
  Code,
  Palette,
  Browser,
  FigmaLogo,
  ArrowUpRight,
} from "@phosphor-icons/react"
import { roles } from "../data/portfolio"
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  defaultTransition,
  viewportOnce,
} from "../utils/animations"

const iconMap = {
  Code,
  Palette,
  Browser,
  FigmaLogo,
} as const

export default function Services() {
  return (
    <section id="services" className="section-padding bg-ink text-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
              What I Do
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Services & Expertise
            </h2>
            <p className="mt-4 text-lg text-white/60">
              From writing clean code to crafting beautiful interfaces — here&apos;s how I bring
              ideas to life on the web.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {roles.map((role, index) => {
              const Icon = iconMap[role.icon]
              return (
                <motion.div
                  key={role.title}
                  variants={scaleIn}
                  transition={{ ...defaultTransition, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-colors duration-300 hover:border-accent/50 hover:bg-white/10"
                >
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon size={28} weight="duotone" />
                    </div>

                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold">{role.title}</h3>
                      <ArrowUpRight
                        size={20}
                        weight="bold"
                        className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-light"
                      />
                    </div>

                    <p className="mt-3 leading-relaxed text-white/60">{role.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
