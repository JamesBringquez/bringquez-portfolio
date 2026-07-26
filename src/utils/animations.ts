import {
  type Variants,
  type Transition,
} from "motion/react"

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0 },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
}

export const blurInUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
}

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08,
    },
  },
}

export const staggerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const staggerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.12,
    },
  },
}

export const defaultTransition: Transition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1],
}

export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
}

export const snappySpring: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 24,
}

export const springTransition: Transition = softSpring

export const viewportOnce = {
  once: true,
  margin: "-80px" as const,
}

export const viewportSoft = {
  once: true,
  margin: "-40px" as const,
  amount: 0.25 as const,
}
