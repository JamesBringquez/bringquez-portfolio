import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
} from "@phosphor-icons/react"
import { personalInfo, images } from "../data/portfolio"
import SocialLinks from "./SocialLinks"
import PortfolioImage from "./PortfolioImage"
import { fadeInUp, fadeInRight, staggerContainer, defaultTransition } from "../utils/animations"

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden section-padding pt-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 animate-pulse-ring" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-ink/5 animate-float" />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp} transition={defaultTransition}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted/50 px-4 py-1.5 text-sm font-medium text-accent-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.1 }}
              className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{personalInfo.firstName}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-3 w-full bg-accent/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.2 }}
              className="mt-4 text-xl font-semibold text-ink-muted md:text-2xl"
            >
              {personalInfo.name}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.3 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-subtle"
            >
              {personalInfo.tagline}{" "}
              <span className="font-medium text-ink">
                Web Developer, Web Designer & Front-end Developer
              </span>{" "}
              with a growing passion for{" "}
              <span className="font-medium text-accent">UI/UX design</span>.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-surface transition-all duration-300 hover:bg-ink/90 hover:shadow-xl hover:shadow-ink/20"
              >
                View My Work
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:border-accent hover:text-accent"
              >
                Let&apos;s Connect
              </a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.5 }}
              className="mt-12"
            >
              <SocialLinks variant="hero" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.3 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-ink/5 shadow-2xl shadow-ink/10">
                <PortfolioImage
                  src={images.hero}
                  alt="Developer workspace with laptop and code on screen"
                  wrapperClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
                  priority
                />
              </div>
              <motion.div
                className="absolute -bottom-6 -left-6 hidden overflow-hidden rounded-2xl border-4 border-surface shadow-xl sm:block sm:w-40"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <PortfolioImage
                  src={images.profile}
                  alt={personalInfo.name}
                  wrapperClassName="aspect-square w-40"
                />
              </motion.div>
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-accent/30 bg-accent/10" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-subtle transition-colors hover:text-accent"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={20} weight="bold" />
        </motion.div>
      </motion.a>
    </section>
  )
}
