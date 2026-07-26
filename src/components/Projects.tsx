import { motion } from "motion/react"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { projects, getProjectUrl } from "../data/portfolio"
import PortfolioImage from "./PortfolioImage"
import {
  fadeInUp,
  blurInUp,
  staggerContainer,
  scaleIn,
  defaultTransition,
  softSpring,
  viewportOnce,
} from "../utils/animations"

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-surface-muted">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={blurInUp} transition={defaultTransition} className="section-header">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-ink-subtle md:text-lg md:leading-8">
              Selected work that shows how I build and design. Each project opens in a new tab.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {projects.map((project, index) => {
              const projectUrl = getProjectUrl(project)
              const isExternal = projectUrl.startsWith("http")

              return (
                <motion.article
                  key={project.id}
                  variants={scaleIn}
                  transition={{ ...defaultTransition, delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                  className="group overflow-hidden rounded-2xl border border-ink/5 bg-surface shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/5"
                >
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <motion.div
                        className="h-full"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <PortfolioImage
                          src={project.image}
                          alt={`${project.title} project preview`}
                          wrapperClassName="h-full"
                          className="h-full w-full object-cover object-center"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-xs font-semibold text-surface backdrop-blur-sm">
                        {project.category}
                      </span>
                      <motion.span
                        initial={{ opacity: 0, y: -6 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        {isExternal ? "Open Site" : "Open Project"}
                      </motion.span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <motion.span
                          whileHover={{ scale: 1.08, rotate: -6 }}
                          transition={softSpring}
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white"
                        >
                          <ArrowSquareOut size={18} weight="bold" />
                        </motion.span>
                      </div>

                      <p className="mt-3 text-sm leading-7 text-ink-subtle md:text-[0.95rem]">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                </motion.article>
              )
            })}
          </div>

          <motion.p
            variants={fadeInUp}
            transition={defaultTransition}
            className="mt-8 text-center text-sm text-ink-subtle"
          >
            Want details on a project? Ask me about the process behind it.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
