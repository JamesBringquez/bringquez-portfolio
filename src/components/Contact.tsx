import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  CheckCircle,
  CircleNotch,
  WarningCircle,
  FilePdf,
} from "@phosphor-icons/react"
import { personalInfo } from "../data/portfolio"
import SocialLinks from "./SocialLinks"
import {
  fadeInLeft,
  fadeInRight,
  blurInUp,
  staggerContainer,
  defaultTransition,
  softSpring,
  viewportOnce,
} from "../utils/animations"

type FormStatus = "idle" | "loading" | "success" | "error"

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — bots fill this; humans never see it
    if (String(data.get("company") || "").trim()) {
      setStatus("success")
      form.reset()
      return
    }

    const name = String(data.get("name") || "").trim()
    const email = String(data.get("email") || "").trim()
    const subject = String(data.get("subject") || "").trim()
    const message = String(data.get("message") || "").trim()

    setStatus("loading")
    setErrorMessage("")

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${personalInfo.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _replyto: email,
            _subject: `Portfolio contact: ${subject}`,
            _template: "table",
          }),
        },
      )

      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean
        message?: string
      } | null

      if (!response.ok || result?.success === false || result?.success === "false") {
        throw new Error(
          result?.message || "Something went wrong. Please try again or email me directly.",
        )
      }

      setStatus("success")
      form.reset()
      window.setTimeout(() => setStatus("idle"), 5000)
    } catch (err) {
      setStatus("error")
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please email me directly.",
      )
    }
  }

  const isLoading = status === "loading"
  const isSuccess = status === "success"

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={blurInUp} transition={defaultTransition} className="section-header text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Contact
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-ink-subtle md:text-lg md:leading-8">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid items-start gap-10 lg:grid-cols-5 lg:gap-12">
            <motion.div
              variants={fadeInLeft}
              transition={defaultTransition}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h3 className="text-2xl font-bold text-ink">Get in touch</h3>
                <p className="mt-3 text-base leading-7 text-ink-subtle md:leading-8">
                  Prefer email? Reach me directly at{" "}
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-medium text-accent underline-offset-2 hover:underline"
                  >
                    {personalInfo.email}
                  </a>
                  . The form below sends straight to that inbox.
                </p>
              </div>

              <div className="space-y-4">
                <motion.a
                  href={`mailto:${personalInfo.email}`}
                  whileHover={{ x: 4 }}
                  transition={softSpring}
                  className="group flex items-center gap-4 rounded-xl border border-ink/5 p-4 transition-colors duration-300 hover:border-accent/30 hover:bg-accent-muted/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-110">
                    <EnvelopeSimple size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-subtle">Email</p>
                    <p className="font-semibold text-ink">{personalInfo.email}</p>
                  </div>
                </motion.a>

                <motion.a
                  href={personalInfo.resumeUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={softSpring}
                  className="group flex items-center gap-4 rounded-xl border border-ink/5 p-4 transition-colors duration-300 hover:border-accent/30 hover:bg-accent-muted/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white transition-transform duration-300 group-hover:scale-110">
                    <FilePdf size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-subtle">Resume</p>
                    <p className="font-semibold text-ink">Download PDF</p>
                  </div>
                </motion.a>

                <div className="flex items-center gap-4 rounded-xl border border-ink/5 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-ink/10 bg-surface-muted text-ink">
                    <MapPin size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-subtle">Location</p>
                    <p className="font-semibold text-ink">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-widest text-ink-subtle">
                  Find me online
                </h4>
                <SocialLinks variant="contact" className="mt-4" />
              </div>
            </motion.div>

            <motion.form
              variants={fadeInRight}
              transition={defaultTransition}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-ink/5 bg-surface-muted p-6 md:p-8 lg:col-span-3"
              noValidate={false}
            >
              {/* Honeypot — hidden from real users */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    disabled={isLoading}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    disabled={isLoading}
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-ink">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  disabled={isLoading}
                  placeholder="Project inquiry"
                  className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  disabled={isLoading}
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                />
              </div>

              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    <WarningCircle size={18} weight="bold" className="mt-0.5 shrink-0" />
                    <span>
                      {errorMessage}{" "}
                      <a
                        href={`mailto:${personalInfo.email}`}
                        className="font-semibold underline underline-offset-2"
                      >
                        {personalInfo.email}
                      </a>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                whileHover={isLoading || isSuccess ? undefined : { scale: 1.02, y: -1 }}
                whileTap={isLoading || isSuccess ? undefined : { scale: 0.98 }}
                transition={softSpring}
                disabled={isLoading || isSuccess}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isLoading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <CircleNotch size={20} weight="bold" className="animate-spin" />
                      Sending...
                    </motion.span>
                  ) : isSuccess ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      <CheckCircle size={20} weight="bold" />
                      Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="send"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="inline-flex items-center gap-2"
                    >
                      Send Message
                      <PaperPlaneTilt size={20} weight="bold" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
