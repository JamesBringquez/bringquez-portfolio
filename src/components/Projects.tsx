import { motion } from "framer-motion"
import { ArrowSquareOut } from "@phosphor-icons/react"
import { projects, getProjectUrl } from "../data/portfolio"
import PortfolioImage from "./PortfolioImage"
import {
  fadeInUp,
  staggerContainer,
  scaleIn,
  defaultTransition,
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
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Portfolio
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-xl text-lg text-ink-subtle">
              A selection of my work. Each project opens in a new browser tab — separate from
              this portfolio.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, index) => {
              const projectUrl = getProjectUrl(project)
              const isExternal = projectUrl.startsWith("http")

              return (
                <motion.article
                  key={project.id}
                  variants={scaleIn}
                  transition={{ ...defaultTransition, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-2xl border border-ink/5 bg-surface transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/5"
                >
                  <a
                    href={projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <PortfolioImage
                        src={project.image}
                        alt={`${project.title} project preview`}
                        wrapperClassName="h-full"
                        className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-full bg-ink/90 px-3 py-1 text-xs font-semibold text-surface backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                        {isExternal ? "Open Site" : "Open Project"}
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-accent">
                          {project.title}
                        </h3>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink-muted transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                          <ArrowSquareOut size={18} weight="bold" />
                        </span>
                      </div>

                      <p className="mt-3 leading-relaxed text-ink-subtle">{project.description}</p>

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
        </motion.div>
      </div>
    </section>
  )
}
