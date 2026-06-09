import { useEffect, useState } from "react"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { List, X, MapPin } from "@phosphor-icons/react"
import { RALLY_BASE, RALLY_COURTS, RALLY_EVENTS, RALLY_JOIN, RALLY_LOGO, rallyInfo } from "./pickleballData"

const navItems = [
  { to: RALLY_BASE, label: "Home", end: true },
  { to: RALLY_COURTS, label: "Courts", end: false },
  { to: RALLY_EVENTS, label: "Events", end: false },
  { to: RALLY_JOIN, label: "Join", end: false },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-[#16a34a] ${isActive ? "text-[#16a34a]" : "text-slate-600"}`

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `block w-full rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition-colors ${
    isActive
      ? "bg-[#16a34a]/10 text-[#15803d]"
      : "text-slate-700 hover:bg-emerald-50 hover:text-[#16a34a] active:bg-emerald-100"
  }`

export default function PickleballLayout() {
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
    <div className="rally-page min-h-screen overflow-x-hidden bg-[#fafaf8] font-sans text-slate-900">
      <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-md">
        <div className="h-1 w-full bg-linear-to-r from-[#16a34a] via-[#f97316] to-[#16a34a]" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <Link to={RALLY_BASE} className="flex min-w-0 items-center gap-3">
            <img
              src={RALLY_LOGO}
              alt={rallyInfo.name}
              className="h-11 w-11 rounded-xl object-cover ring-2 ring-[#16a34a]/20 sm:h-12 sm:w-12"
            />
            <div className="min-w-0">
              <span className="block truncate text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                {rallyInfo.shortName}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                <MapPin size={11} weight="bold" className="shrink-0 text-[#16a34a]" />
                <span className="truncate">{rallyInfo.location}</span>
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden rounded-full bg-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-800 lg:inline">
              Draft
            </span>
            <Link
              to={RALLY_JOIN}
              className="hidden rounded-full bg-[#16a34a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#15803d] sm:inline-block"
            >
              Join the club
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-100 text-slate-700 transition-colors hover:bg-emerald-50 md:hidden"
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
                className="relative z-50 overflow-hidden border-t border-emerald-100 bg-white md:hidden"
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
                  <li className="pt-2">
                    <NavLink
                      to={RALLY_JOIN}
                      className="block rounded-full bg-[#16a34a] px-4 py-3.5 text-center text-sm font-bold text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      Join the club
                    </NavLink>
                  </li>
                </ul>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>

      <Outlet />

      <footer className="border-t border-emerald-200 bg-[#14532d] px-6 py-12 text-white">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xl font-black">{rallyInfo.name}</p>
              <p className="mt-2 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin size={16} weight="bold" />
                {rallyInfo.location}, {rallyInfo.city}
              </p>
              <p className="mt-1 text-xs text-white/50">{rallyInfo.draftNote}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to={RALLY_COURTS}
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Courts
              </Link>
              <Link
                to={RALLY_EVENTS}
                className="rounded-full border border-white/25 px-5 py-2 text-sm font-semibold transition-colors hover:bg-white/10"
              >
                Events
              </Link>
              <a
                href="/"
                className="rounded-full bg-white px-6 py-2 text-sm font-bold text-[#14532d] transition-opacity hover:opacity-90"
              >
                ← Back to Portfolio
              </a>
            </div>
          </div>
          <p className="mt-10 text-center text-xs text-white/40">
            Personal project concept by James Matthew P. Bringquez
          </p>
        </div>
      </footer>
    </div>
  )
}
