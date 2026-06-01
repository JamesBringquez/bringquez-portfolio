import { motion } from "framer-motion"
import { Heart, ArrowUp } from "@phosphor-icons/react"
import { personalInfo, navLinks } from "../data/portfolio"
import LogoMark from "./LogoMark"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ink/5 bg-ink text-surface">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <LogoMark size={48} />
            <div>
              <p className="text-lg font-bold">{personalInfo.name}</p>
              <p className="mt-1 text-sm text-white/50">{personalInfo.title}</p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/50 transition-colors duration-300 hover:text-accent-light"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <motion.a
            href="#"
            whileHover={{ y: -4 }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white"
            aria-label="Back to top"
          >
            <ArrowUp size={20} weight="bold" />
          </motion.a>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-white/40">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-sm text-white/40">
            Built with
            <Heart size={14} weight="fill" className="text-accent" />
            using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  )
}
