import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { SERA_BASE, SERA_TERMS, seraOperator } from "./seraData"

const sections = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy explains how Sera (the "Bot"), operated by ${seraOperator.name}, collects, uses, and handles information when you interact with the Bot on Discord. By using the Bot, you acknowledge the practices described in this policy.`,
  },
  {
    title: "2. Information we process",
    body: `To provide its features, the Bot may process the following types of information received from Discord: your Discord user ID, username and display name, server (guild) ID, channel ID, message content related to commands, voice channel membership, slash command inputs, and interaction metadata (such as timestamps and command names). If DM inbox relay is enabled in a server, direct messages sent to the Bot may be forwarded to a designated staff inbox channel.`,
  },
  {
    title: "3. How we use information",
    body: `Information is used solely to operate Bot features, including music queue management, Japanese learning responses, translation requests, staff announcements, voice channel status updates, permission checks, and DM relay workflows. We do not sell your personal information. We do not use Discord data for advertising or unrelated marketing purposes.`,
  },
  {
    title: "4. Data storage and retention",
    body: `Most Bot data is processed in memory for active sessions (for example: music queues and temporary command state) and is not stored permanently. Configuration such as inbox channel settings may persist for as long as the Bot remains in a server. Logs may briefly record errors or operational events to maintain reliability. Data is retained only as long as reasonably necessary to provide the Bot's functionality.`,
  },
  {
    title: "5. Third-party services",
    body: `Certain features rely on third-party services, including Discord's API, audio sources accessed via yt-dlp (such as YouTube and SoundCloud), and translation providers (such as Lingva, DeepL, or MyMemory when configured). When you use these features, relevant request data may be sent to those services according to their own privacy policies. The Bot does not control how third parties handle data once it is transmitted to them.`,
  },
  {
    title: "6. Data sharing",
    body: `We do not share Discord user data with third parties except as needed to operate Bot features (for example: sending a translation request to a translation API) or when required by law. Server staff may see information in staff-only channels when features like DM inbox relay or administrative commands are used.`,
  },
  {
    title: "7. Your choices",
    body: `You can stop interacting with the Bot at any time. Server owners may remove the Bot from their server, which ends further data processing for that server. You may contact the operator to ask questions about data handling. Some data is controlled by Discord; you can review Discord's privacy settings and policies at discord.com/privacy.`,
  },
  {
    title: "8. Security",
    body: `Reasonable measures are taken to protect Bot credentials and configuration, including storing secrets in environment variables rather than in public code. No method of transmission or storage is completely secure, and absolute security cannot be guaranteed.`,
  },
  {
    title: "9. Children's privacy",
    body: `The Bot is intended for use on Discord, which requires users to meet Discord's minimum age requirements. The Bot is not directed at children under 13, and we do not knowingly collect personal information from children under 13.`,
  },
  {
    title: "10. Changes to this policy",
    body: `This Privacy Policy may be updated from time to time. The "Last updated" date at the top of this page will reflect the latest revision. Continued use of the Bot after changes are posted constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact",
    body: `For privacy-related questions or requests, contact ${seraOperator.name} at ${seraOperator.email}.`,
  },
]

export default function SeraPrivacyPolicy() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = "Privacy Policy — Sera Discord Bot"
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
          <h1 className="mt-3 text-3xl font-black md:text-4xl">Privacy Policy</h1>
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
            This Privacy Policy describes how {seraOperator.name} handles information when you
            use Sera on Discord. It is provided for Discord Developer Portal compliance and for
            users who want to understand how their data is processed.
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
              to={SERA_TERMS}
              className="text-sm font-bold text-[#2563eb] hover:text-[#1d4ed8]"
            >
              Terms of Service →
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
