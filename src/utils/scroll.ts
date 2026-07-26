const NAV_OFFSET = 88

/** Sections with large top padding need a nudge so content sits at eye level */
const EYE_LEVEL_NUDGE: Record<string, number> = {
  about: 0.1,
  experience: 0.05,
  services: 0.05,
  skills: 0.05,
  projects: 0.05,
  contact: 0.04,
}

export function scrollToSection(href: string) {
  if (href === "#" || href === "") {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.history.replaceState(null, "", window.location.pathname)
    return
  }

  const id = href.replace(/^#/, "")
  const target = document.getElementById(id)
  if (!target) return

  const fraction = EYE_LEVEL_NUDGE[id] ?? 0
  const nudge = Math.min(140, Math.round(window.innerHeight * fraction))
  const top =
    target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET + nudge

  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" })
  window.history.replaceState(null, "", `${window.location.pathname}${href}`)
}
