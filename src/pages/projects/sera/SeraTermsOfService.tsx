import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { SERA_BASE, SERA_PRIVACY, seraOperator } from "./seraData"

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By inviting, using, or interacting with Sera (the "Bot") in any Discord server, you agree to these Terms of Service ("Terms"). If you do not agree, do not use the Bot. Server owners and administrators who add the Bot are responsible for informing their members of these Terms.`,
  },
  {
    title: "2. Description of service",
    body: `Sera is a Discord bot that provides voice music playback, Japanese learning tools, and server administration utilities. Features may change, be added, or be removed at any time without prior notice. The Bot is provided as a personal project and is not affiliated with, endorsed by, or sponsored by Discord Inc.`,
  },
  {
    title: "3. Eligibility and user conduct",
    body: `You must comply with Discord's Terms of Service and Community Guidelines at all times. You agree not to use the Bot to harass others, spam commands, attempt to exploit or reverse-engineer the Bot, circumvent permission controls, or use the Bot for any unlawful purpose. Staff-only commands must only be used by authorized server moderators.`,
  },
  {
    title: "4. Music and third-party content",
    body: `Music playback features may retrieve audio from third-party sources (including YouTube, SoundCloud, and Spotify-linked matches). Sera does not host media files. Users are responsible for ensuring they have the right to request and play content in their server. The operator does not guarantee uninterrupted playback or compatibility with every URL or platform.`,
  },
  {
    title: "5. Japanese toolkit and translations",
    body: `Learning and translation features use curated data and third-party translation services. Outputs are provided for casual educational use only and may be inaccurate. Do not rely on the Bot for professional translation, legal, medical, or safety-critical purposes.`,
  },
  {
    title: "6. Data and privacy",
    body: `To function, the Bot processes Discord messages, commands, voice channel membership, and related metadata necessary to execute features (for example: queue management, slash command responses, and DM inbox relay where enabled). Message content is not sold. Data is processed only to operate the Bot and is not retained longer than reasonably required for its features. For questions about data handling, contact the operator at ${seraOperator.email}.`,
  },
  {
    title: "7. Availability and disclaimer",
    body: `The Bot is provided "as is" and "as available" without warranties of any kind, express or implied. The operator does not guarantee uptime, error-free operation, or that the Bot will meet your requirements. Use of the Bot is at your own risk.`,
  },
  {
    title: "8. Limitation of liability",
    body: `To the fullest extent permitted by law, ${seraOperator.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Bot, including loss of data, server disruption, or issues related to third-party content or services.`,
  },
  {
    title: "9. Termination",
    body: `The operator may restrict, suspend, or discontinue access to the Bot for any user or server at any time, with or without notice. Server owners may remove the Bot at any time. Sections that by their nature should survive termination (including disclaimers and limitations of liability) will remain in effect.`,
  },
  {
    title: "10. Changes to these Terms",
    body: `These Terms may be updated from time to time. The "Last updated" date at the top of this page will reflect the latest revision. Continued use of the Bot after changes are posted constitutes acceptance of the revised Terms.`,
  },
  {
    title: "11. Contact",
    body: `For questions about these Terms or the Bot, contact ${seraOperator.name} at ${seraOperator.email}.`,
  },
]

export default function SeraTermsOfService() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = "Terms of Service — Sera Discord Bot"
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <>
      <section className="border-b border-slate-200 bg-[#2563eb] px-6 py-12 text-white md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-white/60">Legal</p>
          <h1 className="mt-3 text-3xl font-black md:text-4xl">Terms of Service</h1>
          <p className="mt-3 text-sm text-white/75">Sera Discord Bot · Last updated: June 4, 2026</p>
        </motion.div>
      </section>

      <main className="bg-white px-6 py-14 md:py-16">
        <div className="mx-auto max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="leading-relaxed text-slate-600"
          >
            These Terms govern your use of Sera, a Discord bot operated by {seraOperator.name}.
            This page is provided for Discord Developer Portal compliance and for users who want
            to understand the rules of using the Bot.
          </motion.p>

          <div className="mt-10 space-y-10">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="border-b border-slate-100 pb-10 last:border-0 last:pb-0"
              >
                <h2 className="text-lg font-black text-slate-900">{section.title}</h2>
                <p className="mt-3 leading-relaxed text-slate-600">{section.body}</p>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              to={SERA_PRIVACY}
              className="text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8]"
            >
              Privacy Policy →
            </Link>
            <Link
              to={SERA_BASE}
              className="text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8]"
            >
              ← Back to Sera overview
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  )
}
