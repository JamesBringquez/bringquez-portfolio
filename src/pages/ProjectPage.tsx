import { useParams, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ArrowSquareOut,
  GithubLogo,
  Calendar,
  User,
  CheckCircle,
} from "@phosphor-icons/react"
import { getProjectBySlug, personalInfo } from "../data/portfolio"
import PortfolioImage from "../components/PortfolioImage"

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  if (!project || !project.page) return <Navigate to="/" replace />

  const { page } = project

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {project.category}
            </p>
            <h1 className="mt-1 text-xl font-bold md:text-2xl">{project.title}</h1>
          </div>
          <a
            href="/"
            className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-blue-600 hover:text-blue-600"
          >
            Portfolio
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative mb-12 overflow-hidden rounded-2xl">
            <PortfolioImage
              src={project.image}
              alt={`${project.title} preview`}
              wrapperClassName="aspect-[21/9] min-h-[220px] md:min-h-[320px]"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-6 left-6 text-sm font-semibold uppercase tracking-widest text-white">
              {project.category}
            </p>
          </div>

          <p className="text-lg leading-relaxed text-gray-600">{page.overview}</p>

          <div className="mt-8 flex flex-wrap gap-6 border-y border-gray-100 py-6 text-sm">
            {page.role && (
              <div className="flex items-center gap-2">
                <User size={18} className="text-blue-600" />
                <div>
                  <p className="text-gray-400">Role</p>
                  <p className="font-medium">{page.role}</p>
                </div>
              </div>
            )}
            {page.timeline && (
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                <div>
                  <p className="text-gray-400">Timeline</p>
                  <p className="font-medium">{page.timeline}</p>
                </div>
              </div>
            )}
          </div>

          {page.features && page.features.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-bold">Key Features</h2>
              <ul className="mt-6 space-y-3">
                {page.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3"
                  >
                    <CheckCircle
                      size={20}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            {page.demoUrl && (
              <a
                href={page.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Live Demo
                <ArrowSquareOut size={16} weight="bold" />
              </a>
            )}
            {page.githubUrl && (
              <a
                href={page.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-900"
              >
                <GithubLogo size={18} weight="bold" />
                View Code
              </a>
            )}
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
        <p>
          {project.title} — Project by {personalInfo.name}
        </p>
      </footer>
    </div>
  )
}
