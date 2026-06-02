import { useState, useEffect, useRef, type MouseEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { List, X } from "@phosphor-icons/react"
import { navLinks, personalInfo } from "../data/portfolio"
import LogoMark from "./LogoMark"

function scrollToSection(href: string) {
  if (href === "#" || href === "") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", window.location.pathname)
    return
  }

  const id = href.replace(/^#/, "")
  const target = document.getElementById(id)
  if (!target) return

  target.scrollIntoView({ behavior: "smooth", block: "start" })
  window.history.replaceState(null, "", `${window.location.pathname}${href}`)
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pendingScrollRef = useRef<string | null>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  /** Scroll only after mobile menu is fully closed (fixes iOS / overflow lock issues) */
  useEffect(() => {
    if (mobileOpen) return

    const href = pendingScrollRef.current
    if (!href) return
    pendingScrollRef.current = null

    const timer = window.setTimeout(() => {
      scrollToSection(href)
    }, 50)

    return () => window.clearTimeout(timer)
  }, [mobileOpen])

  const openMobileNav = (href: string) => {
    pendingScrollRef.current = href
    setMobileOpen(false)
  }

  const handleDesktopNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    e.preventDefault()
    scrollToSection(href)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md shadow-sm border-b border-ink/5"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#"
          aria-label={`${personalInfo.name} — Home`}
          onClick={(e) => handleDesktopNav(e, "#")}
          className="group flex items-center gap-2.5 text-lg font-bold tracking-tight text-ink"
        >
          <LogoMark
            size={40}
            className="shrink-0 transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:inline">
            {personalInfo.firstName}
            <span className="text-accent">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleDesktopNav(e, link.href)}
                className="relative text-sm font-medium text-ink-muted transition-colors duration-300 hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={(e) => handleDesktopNav(e, "#contact")}
          className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 md:inline-block"
        >
          Get in Touch
        </a>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg border border-ink/10 text-ink transition-colors hover:bg-ink/5 md:hidden"
        >
          {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-50 border-t border-ink/5 bg-surface shadow-lg md:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => openMobileNav(link.href)}
                      className="w-full rounded-lg px-4 py-3.5 text-left text-base font-medium text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink active:bg-ink/10"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    type="button"
                    onClick={() => openMobileNav("#contact")}
                    className="w-full rounded-full bg-accent px-4 py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-accent-dark active:bg-accent-dark"
                  >
                    Get in Touch
                  </button>
                </li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
