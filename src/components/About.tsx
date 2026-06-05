import { motion } from "framer-motion"
import { User, Compass, Heart } from "@phosphor-icons/react"
import { personalInfo, experience, images } from "../data/portfolio"
import PortfolioImage from "./PortfolioImage"
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultTransition,
  viewportOnce,
} from "../utils/animations"

export default function About() {
  return (
    <section id="about" className="section-padding bg-surface-muted">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              About Me
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Building the web, one pixel at a time
            </h2>
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div variants={fadeInLeft} transition={defaultTransition}>
              <div className="relative max-w-md">
                <div className="overflow-hidden rounded-2xl border border-ink/5 shadow-xl">
                  <PortfolioImage
                    src={images.profile}
                    alt={`${personalInfo.name} — ${personalInfo.title}`}
                    wrapperClassName="aspect-[4/5]"
                  />
                </div>
                <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-surface">
                  <p className="text-lg font-semibold">{personalInfo.name}</p>
                  <p className="mt-1 text-sm text-white/70">{personalInfo.title}</p>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent/30 px-4 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                    <Compass size={14} weight="bold" />
                    Exploring UI/UX
                  </div>
                </div>
                <motion.div
                  className="absolute -bottom-4 -right-4 rounded-xl border border-ink/5 bg-surface px-5 py-3 shadow-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                >
                  <p className="text-2xl font-bold text-accent">{experience.shortLabel}</p>
                  <p className="text-xs font-medium text-ink-subtle">{experience.field} Experience</p>
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} transition={defaultTransition} className="space-y-6">
              <p className="text-lg leading-relaxed text-ink-muted">
                I&apos;m <strong className="font-semibold text-ink">{personalInfo.name}</strong>,
                a passionate creator who lives at the crossroads of development and design. I
                transform ideas into elegant, functional digital experiences that users love.
              </p>
              <p className="text-lg leading-relaxed text-ink-muted">
                With{" "}
                <span className="font-medium text-ink">{experience.fullLabel}</span> of professional
                experience in web development, I have a strong foundation in{" "}
                <span className="font-medium text-ink">C#, HTML, CSS, JavaScript, and Bootstrap</span>.
                I&apos;m currently learning{" "}
                <span className="font-medium text-accent">React, TypeScript, and Tailwind CSS</span>{" "}
                and building confidence with them as I grow into modern front-end development.
              </p>
              <p className="text-lg leading-relaxed text-ink-muted">
                Currently, I&apos;m expanding my horizons into{" "}
                <span className="font-medium text-accent">UI/UX design</span> — studying user
                behavior, creating wireframes, and designing experiences that put people first.
              </p>

              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {[
                  { icon: User, title: "User-Focused", desc: "Design with empathy and purpose" },
                  { icon: Compass, title: "Always Learning", desc: "Growing into UI/UX every day" },
                  { icon: Heart, title: "Detail-Oriented", desc: "Pixel-perfect execution" },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="group rounded-xl border border-ink/5 bg-surface p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-md"
                  >
                    <Icon
                      size={24}
                      weight="duotone"
                      className="text-accent transition-transform duration-300 group-hover:scale-110"
                    />
                    <h3 className="mt-2 font-semibold text-ink">{title}</h3>
                    <p className="mt-1 text-sm text-ink-subtle">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
