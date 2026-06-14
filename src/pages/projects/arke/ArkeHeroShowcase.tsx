import { useCallback, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react"
import { ARKE_COLLECTIONS, getProductUrl, heroShowcase } from "./arkeData"

const SLIDES = heroShowcase.map((slide) => ({
  id: slide.id,
  name: slide.name,
  slug: slide.slug,
  tag: slide.tag,
  image: slide.image,
}))

const INTERVAL_MS = 4500

export default function ArkeHeroShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [direction, setDirection] = useState(1)

  const active = SLIDES[activeIndex]

  const goTo = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex((index + SLIDES.length) % SLIDES.length)
  }, [activeIndex])

  const goNext = useCallback(() => {
    setDirection(1)
    setActiveIndex((i) => (i + 1) % SLIDES.length)
  }, [])

  const goPrev = useCallback(() => {
    setDirection(-1)
    setActiveIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length)
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    const timer = window.setInterval(goNext, INTERVAL_MS)
    return () => window.clearInterval(timer)
  }, [isPlaying, goNext])

  const slideVariants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 32 : -32 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -32 : 32 }),
  }

  return (
    <section
      className="relative min-h-[70vh] overflow-hidden border-b-2 border-black bg-[#0a0a0a] sm:min-h-[75vh] lg:aspect-[16/9] lg:min-h-0 lg:w-full lg:max-h-[min(92vh,900px)]"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={active.id}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.32, 0.08, 0.24, 1] }}
          className="absolute inset-0 overflow-hidden bg-[#0a0a0a]"
        >
          <img
            src={active.image}
            alt={`${active.name} — Spring / Summer 2026`}
            className="h-full w-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/15 to-black/25" />
      <div className="pointer-events-none absolute inset-0 arke-holo-overlay opacity-10" />

      {/* Collage strip — desktop side rail */}
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-28 flex-col gap-1.5 p-2 lg:flex xl:w-36">
        {SLIDES.map((slide, i) => (
          <motion.button
            key={slide.id}
            type="button"
            pointer-events-auto
            onClick={() => goTo(i)}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08 * i }}
            className={`relative flex-1 overflow-hidden border-2 transition-all ${
              i === activeIndex
                ? "border-white opacity-100 ring-2 ring-white/50"
                : "border-white/30 opacity-55 hover:opacity-90"
            }`}
            aria-label={`View ${slide.name}`}
            aria-current={i === activeIndex ? "true" : undefined}
          >
            <img src={slide.image} alt="" className="h-full w-full object-cover object-center" />
          </motion.button>
        ))}
      </div>

      {/* Main overlay content */}
      <div className="relative flex h-full min-h-[70vh] flex-col justify-end px-4 pb-6 pt-16 sm:min-h-[75vh] sm:px-8 sm:pb-8 lg:min-h-0 lg:pr-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="max-w-xl"
          >
            <p className="text-xs font-black uppercase tracking-[0.45em] text-white/50">
              Spring / Summer 2026
            </p>
            {active.tag && (
              <span className="mt-3 inline-block border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white backdrop-blur-sm">
                {active.tag}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              <Link
                to={getProductUrl(active.slug)}
                className="transition-opacity hover:opacity-80"
              >
                {active.name}
              </Link>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55 sm:text-base">
              Explore the full ARKĒ lineup — tap a look below or shop the season.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                to={getProductUrl(active.slug)}
                className="inline-block border-2 border-white bg-white px-6 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-transparent hover:text-white"
              >
                View Piece
              </Link>
              <Link
                to={`${ARKE_COLLECTIONS}?tag=New`}
                className="inline-block border-2 border-white/40 px-6 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:border-white"
              >
                Shop New Arrivals
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mobile + tablet thumbnail collage */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              className={`relative h-16 w-12 shrink-0 overflow-hidden border-2 transition-all sm:h-20 sm:w-16 ${
                i === activeIndex ? "border-white opacity-100" : "border-white/30 opacity-50"
              }`}
              aria-label={`View ${slide.name}`}
            >
              <img src={slide.image} alt="" className="h-full w-full object-cover object-center" />
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-5 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous look"
              className="flex h-10 w-10 items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next look"
              className="flex h-10 w-10 items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              <CaretRight size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              className="flex h-10 w-10 items-center justify-center border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              {isPlaying ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
            </button>
          </div>

          <div className="flex flex-1 items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to ${slide.name}`}
                className="group relative h-1 flex-1 overflow-hidden bg-white/25"
              >
                {i === activeIndex && (
                  <motion.span
                    key={activeIndex}
                    className="absolute inset-y-0 left-0 bg-white"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: isPlaying ? INTERVAL_MS / 1000 : 0.15,
                      ease: "linear",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <span className="hidden text-xs font-bold tabular-nums text-white/45 sm:inline">
            {String(activeIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  )
}
