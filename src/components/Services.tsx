import { motion } from "motion/react"
import {
  Code,
  Palette,
  Browser,
  FigmaLogo,
} from "@phosphor-icons/react"
import { roles } from "../data/portfolio"
import {
  blurInUp,
  staggerContainer,
  scaleIn,
  defaultTransition,
  softSpring,
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
          <motion.div variants={blurInUp} transition={defaultTransition} className="section-header max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
              What I Do
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">
              Services & Expertise
            </h2>
            <p className="mt-4 text-base leading-7 text-white/60 md:text-lg md:leading-8">
              From writing clean code to crafting clear interfaces — here&apos;s how I bring
              ideas to life on the web.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
            {roles.map((role, index) => {
              const Icon = iconMap[role.icon]
              return (
                <motion.div
                  key={role.title}
                  variants={scaleIn}
                  transition={{ ...defaultTransition, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-300 hover:border-accent/50 hover:bg-white/10 md:p-8"
                >
                  <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-accent/10 transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 3 }}
                      transition={softSpring}
                      className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white"
                    >
                      <Icon size={28} weight="duotone" />
                    </motion.div>

                    <h3 className="text-xl font-bold">{role.title}</h3>
                    <p className="mt-3 text-base leading-7 text-white/60">{role.description}</p>
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
