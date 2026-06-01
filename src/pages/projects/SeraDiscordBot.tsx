import { useState } from "react"
import { motion } from "framer-motion"
import {
  MusicNotes,
  Translate,
  Shield,
  Terminal,
  Headphones,
  BookOpen,
  Envelope,
  Lightning,
  CaretRight,
} from "@phosphor-icons/react"

const featureTabs = [
  { id: "music", label: "Music & Voice", icon: MusicNotes },
  { id: "japanese", label: "Japanese Toolkit", icon: Translate },
  { id: "server", label: "Server Tools", icon: Shield },
] as const

const SERA_LOGO = "/images/sera-logo.png"

const featureContent = {
  music: {
    title: "Music & voice playback",
    description:
      "Sera acts as a voice-channel DJ: users join voice, request tracks in text, and the bot connects, plays audio, and manages a per-server queue.",
    sources: "YouTube, YouTube Music, SoundCloud, Spotify links (matched to YouTube for playback)",
    commands: [
      "!play / !p — search or URL",
      "!pause / !resume — playback control",
      "!skip / !s — skip track",
      "!stop — stop and clear queue",
      "!queue / !q — show queue",
      "!np / !nowplaying — current track embed",
      "!disconnect / !dc — leave voice",
    ],
    highlights: [
      "Rich Now Playing embeds with album art and requester info",
      "Must be in voice to use !play; bot joins your channel",
      "Handles FFmpeg errors and connection drops gracefully",
    ],
  },
  japanese: {
    title: "Japanese learning toolkit",
    description:
      "Slash commands for learners with curated offline data plus live translation APIs and Hepburn romaji readings.",
    sources: "Lingva (default), optional DeepL, MyMemory fallback · pykakasi for romaji",
    commands: [
      "/jp-word — random word with romaji & English",
      "/jp-kana — hiragana/katakana cheat sheet",
      "/jp-quiz — kana quiz mode",
      "/jp-place — places in Japan by region",
      "/jp-culture — customs & daily life",
      "/jp-events — calendar highlights",
      "/jp-live — curated Japan live camera links",
      "/jp-translate — EN → JA + romaji",
    ],
    highlights: [
      "Casual practice for vocabulary, kana, and culture",
      "Live translation with automatic romaji notes",
      "Interactive buttons on live camera links",
    ],
  },
  server: {
    title: "Server & moderation tools",
    description:
      "Staff tools guarded by Discord permissions and optional user-ID allowlists for voice, announcements, and modmail-style inbox workflows.",
    sources: "discord.py permissions · .env allowlists · modal broadcasts",
    commands: [
      "/join · /leave — voice channel control",
      "/vc-status · /vc-clear — channel status text",
      "/say-popup — modal message to channels",
      "/inbox-set · /inbox-show — DM relay inbox",
      "/dm-user · /dm-summary — DM administration",
    ],
    highlights: [
      "DMs to the bot forwarded to a private inbox channel",
      "Voice Channel Status text management",
      "Outbound DMs logged for staff accountability",
    ],
  },
}

const techStack = [
  "Python 3.10+",
  "discord.py 2.x",
  "yt-dlp",
  "FFmpeg",
  "aiohttp",
  "pykakasi",
  "Lingva / DeepL",
  ".env config",
  "Modular cogs",
]

const problems = [
  {
    icon: Headphones,
    title: "For members",
    text: "Listen together in voice with queue support and rich Now Playing feedback from popular platforms.",
  },
  {
    icon: BookOpen,
    title: "For learners",
    text: "Practice Japanese casually — vocabulary, kana quizzes, culture, calendar events, and EN→JA translation.",
  },
  {
    icon: Shield,
    title: "For staff",
    text: "Manage voice, announce with modals, and handle support-style DM relay with permission controls.",
  },
]

export default function SeraDiscordBot() {
  const [activeTab, setActiveTab] =
    useState<(typeof featureTabs)[number]["id"]>("music")
  const content = featureContent[activeTab]

  return (
    <div className="sera-page min-h-screen overflow-x-hidden bg-white font-sans text-slate-900">
      {/* White header with blue accent line */}
      <header className="border-b border-slate-200 bg-white">
        <div className="h-1 w-full bg-[#2563eb]" />
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <a href="/projects/sera-discord-bot" className="flex min-w-0 items-center gap-3">
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
          </a>
          <span className="hidden rounded-full bg-[#ec4899] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white sm:inline">
            Personal Project
          </span>
        </div>
      </header>

      {/* 60% white — hero */}
      <section className="relative overflow-hidden bg-white px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#ec4899]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-[#2563eb]/5 blur-3xl" />
        <div className="relative mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/20 bg-[#eff6ff] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#1d4ed8]">
              <Lightning size={14} weight="fill" className="text-[#ec4899]" />
              Python · discord.py
            </span>
            <h1 className="mt-6 text-3xl font-black leading-tight text-slate-900 sm:text-4xl md:text-6xl">
              Music, Japanese learning,
              <br />
              <span className="text-[#ec4899]">and server tools</span>
              <br />
              in one bot.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              Sera is a custom Discord bot I built for real community use — voice playback with
              yt-dlp and FFmpeg, a full Japanese learning suite, and staff utilities for voice,
              announcements, and DM inbox relay.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-bold text-white">
                Slash commands
              </span>
              <span className="rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                ! prefix for music
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* White — what Sera solves */}
      <section className="border-t border-slate-100 bg-[#fafafa] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-sm font-bold uppercase tracking-widest text-[#2563eb]">
            What Sera solves
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {problems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff6ff]">
                  <item.icon size={28} weight="duotone" className="text-[#2563eb]" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 30% blue — features */}
      <section className="bg-[#2563eb] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black md:text-3xl">Features</h2>
          <p className="mt-2 max-w-xl text-white/80">
            Modular cogs per feature area — music, Japanese toolkit, server tools, and general
            utilities.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {featureTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-white text-[#1d4ed8] ring-2 ring-[#ec4899] ring-offset-2 ring-offset-[#2563eb]"
                    : "bg-white/15 text-white hover:bg-white/25"
                }`}
              >
                <tab.icon size={18} weight="duotone" />
                {tab.label}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-2xl border border-white/20 bg-[#1d4ed8] p-4 sm:p-8"
          >
            <h3 className="text-xl font-bold">{content.title}</h3>
            <p className="mt-3 leading-relaxed text-white/85">{content.description}</p>
            <p className="mt-4 text-sm font-medium text-[#fbcfe8]">{content.sources}</p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">Commands</p>
                <ul className="mt-3 space-y-2">
                  {content.commands.map((cmd) => (
                    <li
                      key={cmd}
                      className="flex items-start gap-2 break-words rounded-lg bg-white/10 px-3 py-2 font-mono text-xs text-white/95 sm:text-sm"
                    >
                      <Terminal size={16} className="mt-0.5 shrink-0 text-[#f9a8d4]" />
                      {cmd}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-white/50">
                  UX highlights
                </p>
                <ul className="mt-3 space-y-3">
                  {content.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-white/85">
                      <CaretRight size={16} weight="bold" className="mt-0.5 shrink-0 text-[#fbcfe8]" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 30% blue — tech (lighter blue band) */}
      <section className="bg-[#1e40af] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-black">Technical foundation</h2>
          <p className="mt-2 max-w-xl text-white/80">
            Async architecture with secrets in .env, optional guild sync for development, and
            global sync for production.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-[#1d4ed8]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <Envelope size={24} weight="duotone" className="text-[#fbcfe8]" />
              <h3 className="mt-3 font-bold">Also includes</h3>
              <p className="mt-2 text-sm text-white/80">
                /help with categories · /ping · !8ball · permission-guarded staff commands
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-white/10 p-5">
              <Shield size={24} weight="duotone" className="text-[#fbcfe8]" />
              <h3 className="mt-3 font-bold">Security</h3>
              <p className="mt-2 text-sm text-white/80">
                Secrets in .env · optional privileged user allowlists · guild-only commands where
                needed
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* White — closing */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border-2 border-[#2563eb]/20 bg-white p-8 text-center shadow-lg md:p-12">
          <img
            src={SERA_LOGO}
            alt="Sera Discord Bot"
            className="mx-auto h-24 w-24 rounded-full object-cover ring-4 ring-[#2563eb]/15"
          />
          <h2 className="mt-4 text-2xl font-black text-slate-900">Built for real communities</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Sera combines voice music, Japanese learning, and server administration in one
            application — designed with clear UX, embed feedback, modular cogs, and staff
            permission controls.
          </p>
          <span className="mt-6 inline-block rounded-full bg-[#fce7f3] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#db2777]">
            Personal project
          </span>
        </div>
      </section>

      <footer className="border-t border-[#1d4ed8] bg-[#2563eb] px-6 py-10 text-center text-white">
        <p className="text-lg font-black">Sera Discord Bot</p>
        <p className="mt-2 text-sm text-white/70">
          Personal Project by James Matthew P. Bringquez
        </p>
        <a
          href="/"
          className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-bold text-[#1d4ed8] transition-opacity hover:opacity-90"
        >
          ← Back to Portfolio
        </a>
      </footer>
    </div>
  )
}
