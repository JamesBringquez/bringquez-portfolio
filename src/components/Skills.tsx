import { motion } from "framer-motion"
import { Wrench, ShieldCheck, MagnifyingGlass, CodeBlock } from "@phosphor-icons/react"
import { skills, skillCategories, aiAssistedDev } from "../data/portfolio"
import {
  fadeInUp,
  staggerContainer,
  staggerFast,
  defaultTransition,
  viewportOnce,
} from "../utils/animations"

export default function Skills() {
  const activeCategories = skillCategories.filter((cat) =>
    skills.some((s) => s.category === cat),
  )

  return (
    <section id="skills" className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Capabilities
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Skills & Tools
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-ink-subtle">
              Programming, design, databases, technical support, certifications, and the tools I
              use to build modern web experiences.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {activeCategories.map((category) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                transition={defaultTransition}
                className="rounded-2xl border border-ink/5 bg-surface-muted p-6"
              >
                <div className="mb-4 flex items-center gap-2">
                  <Wrench size={18} weight="duotone" className="text-accent" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                    {category}
                  </h3>
                </div>

                <motion.div
                  variants={staggerFast}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="flex flex-wrap gap-2"
                >
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <motion.span
                        key={skill.name}
                        variants={fadeInUp}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-default rounded-lg border border-ink/5 bg-surface px-4 py-2 text-sm font-medium text-ink transition-all duration-300 hover:border-accent hover:bg-accent-muted hover:text-accent-dark"
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="mt-12 overflow-hidden rounded-2xl border border-ink/5 bg-surface-muted"
          >
            <div className="border-b border-ink/5 bg-ink px-8 py-6">
              <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
                Workflow
              </span>
              <h3 className="mt-2 text-2xl font-bold text-surface md:text-3xl">
                {aiAssistedDev.title}
              </h3>
              <p className="mt-3 max-w-3xl leading-relaxed text-white/60">
                {aiAssistedDev.description}
              </p>
            </div>

            <div className="grid gap-6 p-8 md:grid-cols-3">
              {aiAssistedDev.principles.map(({ title, description }, index) => {
                const icons = [MagnifyingGlass, ShieldCheck, CodeBlock]
                const Icon = icons[index]
                return (
                  <div
                    key={title}
                    className="rounded-xl border border-ink/5 bg-surface p-5"
                  >
                    <Icon size={24} weight="duotone" className="text-accent" />
                    <h4 className="mt-3 font-semibold text-ink">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-ink-subtle">{description}</p>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-ink/5 px-8 py-6">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-muted">
                Tools in my workflow
              </p>
              <div className="flex flex-wrap gap-2">
                {aiAssistedDev.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-lg border border-ink/5 bg-surface px-4 py-2 text-sm font-medium text-ink"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            transition={defaultTransition}
            className="mt-8 rounded-2xl border border-accent/20 bg-accent-muted/30 p-8 text-center"
          >
            <p className="text-lg font-medium text-ink">
              Currently expanding into{" "}
              <span className="font-bold text-accent">UI/UX Design</span> — wireframing,
              prototyping, and user research.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
