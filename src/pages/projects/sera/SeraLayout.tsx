import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { List, X } from "@phosphor-icons/react"
import { SERA_BASE, SERA_LOGO, SERA_PRIVACY, SERA_TERMS } from "./seraData"

const navItems = [
  { to: SERA_BASE, label: "Overview", end: true },
  { to: SERA_TERMS, label: "Terms of Service", end: false },
  { to: SERA_PRIVACY, label: "Privacy Policy", end: false },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-[#2563eb] ${isActive ? "text-[#2563eb]" : "text-slate-500"}`

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block w-full rounded-lg px-4 py-3.5 text-left text-sm font-bold uppercase tracking-widest transition-colors ${
    isActive
      ? "bg-[#2563eb]/10 text-[#2563eb]"
      : "text-slate-600 hover:bg-slate-50 hover:text-[#2563eb] active:bg-slate-100"
  }`

export default function SeraLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <div className="sera-page min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="h-1 w-full bg-[#2563eb]" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link to={SERA_BASE} className="flex min-w-0 items-center gap-3">
            <img
              src={SERA_LOGO}
              alt="Sera Discord Bot"
              className="h-12 w-12 rounded-full object-cover ring-2 ring-[#ec4899]/30"
            />
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900">Sera</span>
              <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Discord Bot
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-[#ec4899] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white lg:inline">
              Personal Project
            </span>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
            >
              {mobileOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
            </button>
          </div>
        </div>

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
                className="fixed inset-0 z-40 bg-slate-900/30 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-50 overflow-hidden border-t border-slate-200 bg-white md:hidden"
              >
                <ul className="flex flex-col gap-1 px-4 py-4">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={mobileNavLinkClass}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      <Outlet />

      <footer className="border-t border-[#1d4ed8] bg-[#2563eb] px-6 py-10 text-center text-white">
        <p className="text-lg font-black">Sera Discord Bot</p>
        <p className="mt-2 text-sm text-white/70">
          Personal Project by James Matthew P. Bringquez
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <Link
            to={SERA_TERMS}
            className="inline-block rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Terms of Service
          </Link>
          <Link
            to={SERA_PRIVACY}
            className="inline-block rounded-full border border-white/30 px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-white/10"
          >
            Privacy Policy
          </Link>
          <a
            href="/"
            className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#1d4ed8] transition-opacity hover:opacity-90"
          >
            ← Back to Portfolio
          </a>
        </div>
      </footer>
    </div>
  )
}
