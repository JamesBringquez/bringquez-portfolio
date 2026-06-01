import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Briefcase, GraduationCap, MapPin, Calendar } from "@phosphor-icons/react"
import { education, workExperience, experience } from "../data/portfolio"
import {
  fadeInUp,
  staggerContainer,
  defaultTransition,
  viewportOnce,
} from "../utils/animations"

function TimelineCard({
  children,
  index,
}: {
  children: ReactNode
  index: number
}) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={{ ...defaultTransition, delay: index * 0.08 }}
      className="relative pl-8 before:absolute before:left-[11px] before:top-3 before:h-[calc(100%-12px)] before:w-px before:bg-ink/10 last:before:hidden"
    >
      <span className="absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent bg-surface">
        <span className="h-2 w-2 rounded-full bg-accent" />
      </span>
      {children}
    </motion.div>
  )
}

function HighlightList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted"
        >
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Background
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Education & Experience
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-ink-subtle">
              {experience.fullLabel} of hands-on work in {experience.field.toLowerCase()}, backed
              by formal training and continuous learning in design and front-end development.
            </p>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <motion.div variants={fadeInUp} transition={defaultTransition}>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-surface">
                  <Briefcase size={24} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Work Experience</h3>
                  <p className="text-sm text-ink-subtle">Professional roles & projects</p>
                </div>
              </div>

              <div className="space-y-8">
                {workExperience.map((job, index) => (
                  <TimelineCard key={job.id} index={index}>
                    <article className="rounded-2xl border border-ink/5 bg-surface-muted p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-lg font-bold text-ink">{job.role}</h4>
                          <p className="mt-1 font-medium text-accent">{job.company}</p>
                        </div>
                        <span className="rounded-full bg-accent-muted px-3 py-1 text-xs font-semibold text-accent-dark">
                          {job.type}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-subtle">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={16} className="text-accent" />
                          {job.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={16} className="text-accent" />
                          {job.location}
                        </span>
                      </div>

                      <HighlightList items={job.highlights} />
                    </article>
                  </TimelineCard>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} transition={defaultTransition}>
              <div className="mb-8 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
                  <GraduationCap size={24} weight="duotone" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">Education</h3>
                  <p className="text-sm text-ink-subtle">Academic background</p>
                </div>
              </div>

              <div className="space-y-8">
                {education.map((item, index) => (
                  <TimelineCard key={item.id} index={index}>
                    <article className="rounded-2xl border border-ink/5 bg-surface-muted p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
                      <h4 className="text-lg font-bold text-ink">{item.degree}</h4>
                      <p className="mt-1 font-medium text-accent">{item.school}</p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-ink-subtle">
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar size={16} className="text-accent" />
                          {item.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={16} className="text-accent" />
                          {item.location}
                        </span>
                      </div>

                      <HighlightList items={item.highlights} />
                    </article>
                  </TimelineCard>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
