import { Link, NavLink, Outlet } from "react-router-dom"
import { SERA_BASE, SERA_LOGO, SERA_PRIVACY, SERA_TERMS } from "./seraData"

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-[#2563eb] ${isActive ? "text-[#2563eb]" : "text-slate-500"}`

export default function SeraLayout() {
  return (
    <div className="sera-page min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="h-1 w-full bg-[#2563eb]" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
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

          <nav className="flex flex-wrap items-center gap-5 text-xs font-bold uppercase tracking-widest sm:gap-8">
            <NavLink to={SERA_BASE} end className={navLinkClass}>
              Overview
            </NavLink>
            <NavLink to={SERA_TERMS} className={navLinkClass}>
              Terms of Service
            </NavLink>
            <NavLink to={SERA_PRIVACY} className={navLinkClass}>
              Privacy Policy
            </NavLink>
          </nav>

          <span className="hidden rounded-full bg-[#ec4899] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white lg:inline">
            Personal Project
          </span>
        </div>
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
