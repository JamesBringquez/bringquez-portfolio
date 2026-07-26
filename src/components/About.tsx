import { motion } from "motion/react"
import { Compass, Eye, StackSimple, UsersThree } from "@phosphor-icons/react"
import { personalInfo, experience, images } from "../data/portfolio"
import PortfolioImage from "./PortfolioImage"
import {
  fadeInLeft,
  fadeInRight,
  blurInUp,
  staggerContainer,
  defaultTransition,
  softSpring,
  viewportOnce,
} from "../utils/animations"

const principles = [
  {
    icon: Eye,
    title: "Clarity over cleverness",
    desc: "If a screen needs explaining, I redesign it. Obvious beats impressive.",
  },
  {
    icon: StackSimple,
    title: "I follow it end to end",
    desc: "From the SQL query to the pixel — I don't hand off a feature and hope.",
  },
  {
    icon: UsersThree,
    title: "Built around real users",
    desc: "Working on internal tools taught me exactly who I'm building for.",
  },
]

export default function About() {
  return (
    <section id="about" className="section-padding scroll-mt-20 bg-surface-muted">
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
            className="section-header max-w-2xl"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              About Me
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              From IT support to front-end — and now, design.
            </h2>
          </motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <motion.div variants={fadeInLeft} transition={defaultTransition}>
              <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-md">
                <div className="overflow-hidden rounded-2xl border border-ink/5 shadow-xl">
                  <PortfolioImage
                    src={images.profile}
                    alt={`${personalInfo.name} — ${personalInfo.title}`}
                    wrapperClassName="aspect-[4/5]"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-6 text-surface">
                  <p className="text-lg font-semibold">{personalInfo.name}</p>
                  <p className="mt-1 text-sm text-white/70">{personalInfo.title}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <Compass size={14} weight="bold" />
                    Going deeper into UI/UX
                  </div>
                </div>
                <motion.div
                  className="absolute -right-4 -bottom-4 rounded-xl border border-ink/5 bg-surface px-5 py-3 shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <p className="text-2xl font-bold text-accent">{experience.shortLabel}</p>
                  <p className="text-xs font-medium text-ink-subtle">
                    {experience.field} Experience
                  </p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeInRight}
              transition={defaultTransition}
              className="space-y-4 md:space-y-5"
            >
              <p className="prose-portfolio">
                I&apos;m <strong className="font-semibold text-ink">James</strong>, a front-end
                developer based in the Philippines. Most of my week goes into reworking a{" "}
                <span className="font-medium text-ink">Document Management System</span> at
                Datascope — an internal tool people rely on all day. Trying to make that less
                frustrating to use is what pulled me toward design in the first place.
              </p>
              <p className="prose-portfolio">
                I didn&apos;t start here. I came up through{" "}
                <span className="font-medium text-ink">IT support and troubleshooting</span>, then
                junior programming — rebuilding a school&apos;s student portal login in C# and
                wiring its grading database in MySQL. Sitting that close to real users showed me how
                much small interface decisions actually matter.
              </p>
              <p className="prose-portfolio">
                These days I build with{" "}
                <span className="font-medium text-accent">React, TypeScript, and Tailwind</span> —
                this site is one of them. I&apos;m comfortable with C#, JavaScript, and SQL on the
                back end too, so I can follow a feature from the database all the way to the pixel.
              </p>
              <p className="prose-portfolio">
                Right now I&apos;m going deeper into{" "}
                <span className="font-medium text-accent">UI/UX</span> — wireframing in Figma and
                testing my own assumptions instead of guessing. I&apos;d rather ship something clear
                than something clever.
              </p>

              <div className="grid gap-3 pt-2 sm:grid-cols-3 sm:gap-4 sm:pt-3">
                {principles.map(({ icon: Icon, title, desc }) => (
                  <motion.div
                    key={title}
                    whileHover={{ y: -4 }}
                    transition={softSpring}
                    className="group rounded-xl border border-ink/5 bg-surface p-4 hover:border-accent/30 hover:shadow-md"
                  >
                    <Icon
                      size={22}
                      weight="duotone"
                      className="text-accent transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="mt-2 text-sm font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-subtle">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
