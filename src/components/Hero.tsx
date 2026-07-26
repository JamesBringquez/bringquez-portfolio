import { motion, useReducedMotion } from "motion/react"
import {
  ArrowDown,
  ArrowRight,
} from "@phosphor-icons/react"
import { personalInfo, images } from "../data/portfolio"
import SocialLinks from "./SocialLinks"
import PortfolioImage from "./PortfolioImage"
import {
  fadeInUp,
  fadeInRight,
  blurInUp,
  staggerSlow,
  defaultTransition,
  softSpring,
} from "../utils/animations"

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden section-padding pt-32">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5"
          animate={
            reduceMotion
              ? undefined
              : { scale: [0.95, 1.05, 0.95], opacity: [0.45, 0.2, 0.45] }
          }
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-ink/5"
          animate={reduceMotion ? undefined : { y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        />
      </div>

      <div className="container-wide relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={staggerSlow}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={blurInUp} transition={defaultTransition}>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent-muted/50 px-4 py-1.5 text-sm font-medium text-accent-dark">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              variants={blurInUp}
              transition={{ ...defaultTransition, delay: 0.05 }}
              className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-ink md:text-6xl lg:text-7xl"
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block">
                <span className="relative z-10">{personalInfo.firstName}</span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-3 w-full bg-accent/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.85, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originX: 0 }}
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.1 }}
              className="mt-4 text-xl font-semibold text-ink md:text-2xl"
            >
              {personalInfo.role}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.15 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink-subtle"
            >
              {personalInfo.tagline}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.2 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={softSpring}
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-surface shadow-lg shadow-ink/10"
              >
                View My Work
                <ArrowRight
                  size={18}
                  weight="bold"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={softSpring}
                className="inline-flex items-center gap-2 rounded-full border-2 border-ink/10 px-7 py-3.5 text-sm font-semibold text-ink hover:border-accent hover:text-accent"
              >
                Let&apos;s Connect
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              transition={{ ...defaultTransition, delay: 0.25 }}
              className="mt-12"
            >
              <SocialLinks variant="hero" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            transition={{ ...defaultTransition, delay: 0.2 }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative">
              <motion.div
                className="overflow-hidden rounded-3xl border border-ink/5 shadow-2xl shadow-ink/10"
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={softSpring}
              >
                <PortfolioImage
                  src={images.hero}
                  alt="Developer workspace with laptop and code on screen"
                  wrapperClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]"
                  priority
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-6 -left-6 hidden overflow-hidden rounded-2xl border-4 border-surface shadow-xl sm:block sm:w-40"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <PortfolioImage
                  src={images.profile}
                  alt={personalInfo.name}
                  wrapperClassName="aspect-square w-40"
                />
              </motion.div>
              <motion.div
                className="absolute -right-4 -top-4 h-24 w-24 rounded-full border-2 border-accent/30 bg-accent/10"
                animate={reduceMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        whileHover={{ y: 4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-ink-subtle transition-colors hover:text-accent"
        aria-label="Scroll to about section"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ArrowDown size={20} weight="bold" />
        </motion.div>
      </motion.a>
    </section>
  )
}
