import { useState, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react"
import { personalInfo } from "../data/portfolio"
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  defaultTransition,
  viewportOnce,
} from "../utils/animations"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <section id="contact" className="section-padding bg-surface">
      <div className="container-wide">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} transition={defaultTransition} className="mb-16 text-center">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Contact
            </span>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-ink md:text-5xl">
              Let&apos;s Work Together
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-ink-subtle">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid gap-12 lg:grid-cols-5">
            <motion.div
              variants={fadeInLeft}
              transition={defaultTransition}
              className="space-y-8 lg:col-span-2"
            >
              <div>
                <h3 className="text-2xl font-bold text-ink">Get in touch</h3>
                <p className="mt-3 leading-relaxed text-ink-subtle">
                  Whether you need a web developer, a designer, or someone exploring the UI/UX
                  space — let&apos;s create something great together.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group flex items-center gap-4 rounded-xl border border-ink/5 p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent-muted/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white transition-transform duration-300 group-hover:scale-110">
                    <EnvelopeSimple size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-subtle">Email</p>
                    <p className="font-semibold text-ink">{personalInfo.email}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 rounded-xl border border-ink/5 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-white">
                    <MapPin size={24} weight="duotone" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ink-subtle">Location</p>
                    <p className="font-semibold text-ink">{personalInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              variants={fadeInRight}
              transition={defaultTransition}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-ink/5 bg-surface-muted p-8 lg:col-span-3"
            >
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
                    placeholder="Your name"
                    className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                    placeholder="you@email.com"
                    className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                  placeholder="Project inquiry"
                  className="w-full rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
                  placeholder="Tell me about your project..."
                  className="w-full resize-none rounded-xl border border-ink/10 bg-surface px-4 py-3 text-ink outline-none transition-all duration-300 placeholder:text-ink-subtle/50 focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitted}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/25 disabled:opacity-70 sm:w-auto"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={20} weight="bold" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    Send Message
                    <PaperPlaneTilt size={20} weight="bold" />
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
