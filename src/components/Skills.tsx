import { motion } from "motion/react"
import { Wrench, ShieldCheck, MagnifyingGlass, CodeBlock } from "@phosphor-icons/react"
import {
  primaryStack,
  learningStack,
  supportingSkills,
  aiAssistedDev,
} from "../data/portfolio"
import {
  fadeInUp,
  blurInUp,
  staggerContainer,
  staggerFast,
  popIn,
  defaultTransition,
  softSpring,
  viewportOnce,
} from "../utils/animations"

const supportingCategories = [
  "Technical Support",
  "Spoken Languages",
  "Certifications",
  "Soft Skills",
] as const

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div
            variants={blurInUp}
            transition={defaultTransition}
            className="section-header text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Capabilities
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Skills & Tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-ink-subtle md:text-lg md:leading-8">
              What I ship with at work first — then the stack I&apos;m deepening as a front-end
              developer with an eye for design.
            </p>
          </motion.div>

          {/* Primary — job stack */}
          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="rounded-2xl border border-ink/10 bg-ink p-6 text-surface md:p-8"
          >
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
                  Primary stack
                </span>
                <h3 className="mt-2 text-2xl font-bold md:text-3xl">Currently using at work</h3>
              </div>
              <p className="max-w-sm text-sm leading-6 text-white/55">
                Day-to-day tools for shipping and maintaining production interfaces.
              </p>
            </div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-2.5 md:gap-3"
            >
              {primaryStack.map((skill) => (
                <motion.span
                  key={skill}
                  variants={popIn}
                  whileHover={{ scale: 1.04, y: -1 }}
                  transition={softSpring}
                  className="cursor-default rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-ink md:px-5 md:text-base"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Learning — quieter */}
          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="mt-6 rounded-2xl border border-ink/5 bg-surface-muted p-6 md:p-8"
          >
            <div className="mb-4">
              <span className="text-sm font-semibold uppercase tracking-widest text-ink-subtle">
                Expanding
              </span>
              <h3 className="mt-2 text-xl font-bold text-ink md:text-2xl">
                Building fluency
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-subtle md:text-base md:leading-7">
                Skills I already use in personal projects and want to deepen further.
              </p>
            </div>

            <motion.div
              variants={staggerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-2"
            >
              {learningStack.map((skill) => (
                <motion.span
                  key={skill}
                  variants={popIn}
                  whileHover={{ scale: 1.03 }}
                  transition={softSpring}
                  className="cursor-default rounded-lg border border-ink/5 bg-surface/60 px-3.5 py-1.5 text-sm font-medium text-ink-muted"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Supporting — lowest weight */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {supportingCategories.map((category) => {
              const items = supportingSkills.filter((s) => s.category === category)
              if (items.length === 0) return null
              return (
                <motion.div
                  key={category}
                  variants={fadeInUp}
                  transition={defaultTransition}
                  className="rounded-xl border border-ink/5 px-4 py-4"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <Wrench size={14} weight="duotone" className="text-ink-subtle" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-ink-subtle">
                      {category}
                    </h4>
                  </div>
                  <ul className="space-y-1.5">
                    {items.map((skill) => (
                      <li key={skill.name} className="text-sm leading-snug text-ink-muted">
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="mt-8 overflow-hidden rounded-2xl border border-ink/5 bg-surface-muted"
          >
            <div className="border-b border-ink/5 bg-ink px-6 py-5 md:px-8 md:py-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
                Workflow
              </span>
              <h3 className="mt-2 text-2xl font-bold text-surface md:text-3xl">
                {aiAssistedDev.title}
              </h3>
              <p className="mt-3 max-w-3xl text-base leading-7 text-white/60 md:leading-8">
                {aiAssistedDev.description}
              </p>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-3 md:gap-6 md:p-8">
              {aiAssistedDev.principles.map(({ title, description }, index) => {
                const icons = [MagnifyingGlass, ShieldCheck, CodeBlock]
                const Icon = icons[index]
                return (
                  <motion.div
                    key={title}
                    whileHover={{ y: -4 }}
                    transition={softSpring}
                    className="rounded-xl border border-ink/5 bg-surface p-5"
                  >
                    <Icon size={24} weight="duotone" className="text-accent" />
                    <h4 className="mt-3 font-semibold text-ink">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-subtle">{description}</p>
                  </motion.div>
                )
              })}
            </div>

            <div className="border-t border-ink/5 px-6 py-5 md:px-8 md:py-6">
              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Tools in my workflow
              </p>
              <div className="flex flex-wrap gap-2">
                {aiAssistedDev.tools.map((tool) => (
                  <motion.span
                    key={tool}
                    whileHover={{ scale: 1.05 }}
                    transition={softSpring}
                    className="rounded-lg border border-ink/5 bg-surface px-4 py-2 text-sm font-medium text-ink"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
