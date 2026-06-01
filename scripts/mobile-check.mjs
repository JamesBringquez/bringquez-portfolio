/**
 * Mobile responsiveness check for personal project pages.
 * Run: npm run test:mobile (requires dev server on :5173)
 */
import { chromium } from "playwright"

const BASE = process.env.BASE_URL ?? "http://localhost:5173"

const viewports = [
  { name: "small-phone", width: 320, height: 568 },
  { name: "iphone-12", width: 390, height: 844 },
  { name: "large-phone", width: 430, height: 932 },
]

const routes = [
  { path: "/projects/arke-clothing", label: "ARKĒ" },
  { path: "/projects/sera-discord-bot", label: "Sera" },
]

const browser = await chromium.launch()
const issues = []
const passes = []

for (const route of routes) {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } })
    const url = `${BASE}${route.path}`
    const key = `${route.label} @ ${vp.name} (${vp.width}px)`

    try {
      await page.goto(url, { waitUntil: "networkidle", timeout: 25000 })
    } catch (e) {
      issues.push({ key, type: "load-failed", detail: String(e) })
      await page.close()
      continue
    }

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement
      const body = document.body
      const overflowX = Math.max(doc.scrollWidth, body.scrollWidth) - window.innerWidth
      const vw = window.innerWidth
      const offenders = []
      document.querySelectorAll("*").forEach((el) => {
        if (el === doc || el === body) return
        const rect = el.getBoundingClientRect()
        if (rect.width === 0 && rect.height === 0) return
        if (rect.right > vw + 2 || rect.left < -2) {
          const cls =
            typeof el.className === "string" ? el.className.split(" ").slice(0, 4).join(".") : ""
          offenders.push({
            tag: el.tagName.toLowerCase(),
            class: cls,
            overflow: Math.round(Math.max(rect.right - vw, -rect.left)),
          })
        }
      })
      offenders.sort((a, b) => b.overflow - a.overflow)

      const smallButtons = []
      document.querySelectorAll("button").forEach((btn) => {
        const r = btn.getBoundingClientRect()
        if (r.width === 0) return
        const label = btn.textContent?.trim().slice(0, 40) || btn.getAttribute("aria-label") || "button"
        if (r.height < 40 && !label.toLowerCase().includes("close")) {
          smallButtons.push({ label, h: Math.round(r.height), w: Math.round(r.width) })
        }
      })

      return {
        overflowX,
        scrollWidth: doc.scrollWidth,
        innerWidth: vw,
        offenders: offenders.slice(0, 5),
        smallButtons: smallButtons.slice(0, 5),
      }
    })

    if (metrics.overflowX > 2) {
      issues.push({
        key,
        type: "horizontal-overflow",
        detail: `${metrics.overflowX}px (scroll ${metrics.scrollWidth} / viewport ${metrics.innerWidth})`,
        offenders: metrics.offenders,
      })
    } else {
      passes.push(`${key} — no horizontal overflow`)
    }

    if (route.label === "ARKĒ" && vp.width === 320) {
      const addBtn = page.getByRole("button", { name: /add to bag/i }).first()
      if (await addBtn.isVisible()) {
        const box = await addBtn.boundingBox()
        if (box && box.width < 44) {
          issues.push({
            key,
            type: "small-tap-target",
            detail: `Add to Bag button width ${Math.round(box.width)}px (recommended ≥44px)`,
          })
        } else {
          passes.push(`${key} — Add to Bag tap target OK`)
        }
      }
    }

    await page.close()
  }
}

{
  // Cart drawer on smallest phone
  const page = await browser.newPage({ viewport: { width: 320, height: 568 } })
  try {
    await page.goto(`${BASE}/projects/arke-clothing`, { waitUntil: "networkidle" })
    await page.getByRole("button", { name: /open shopping bag/i }).click()
    await page.waitForTimeout(400)
    const cartVisible = await page.getByRole("heading", { name: /your bag/i }).isVisible()
    if (cartVisible) passes.push("ARKĒ @ 320px — cart drawer opens")
    else issues.push({ key: "ARKĒ cart", type: "cart-drawer", detail: "Cart did not open on mobile" })
  } catch (e) {
    issues.push({ key: "ARKĒ cart", type: "cart-drawer", detail: String(e) })
  }
  await page.close()
}

await browser.close()

console.log("\n=== Mobile check (320–430px) ===\n")
console.log(`Results (${passes.length} checks passed):\n`)
passes.forEach((p) => console.log(`  ✓ ${p}`))

if (issues.length > 0) {
  console.log(`\nIssues (${issues.length}):\n`)
  console.log(JSON.stringify(issues, null, 2))
  process.exit(1)
}

console.log("\nAll checks passed.\n")
process.exit(0)
