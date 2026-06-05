import { Star } from "@phosphor-icons/react"
import { reviews } from "./arkeData"

function ReviewCard({ review, variant }: { review: (typeof reviews)[number]; variant: "light" | "dark" }) {
  const isDark = variant === "dark"

  return (
    <article
      className={`flex w-[min(85vw,22rem)] shrink-0 flex-col border-2 border-black p-6 sm:w-[22rem] ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex items-center gap-1" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            weight="fill"
            className={i < review.rating ? "text-[#93c5fd]" : isDark ? "text-white/20" : "text-black/15"}
          />
        ))}
      </div>
      <p className={`mt-4 flex-1 text-sm leading-relaxed ${isDark ? "text-white/80" : "text-black/65"}`}>
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className={`mt-5 border-t-2 pt-4 ${isDark ? "border-white/15" : "border-black/10"}`}>
        <p className="text-sm font-black">{review.name}</p>
        <p className={`mt-0.5 text-[10px] font-bold uppercase tracking-widest ${isDark ? "text-white/45" : "text-black/40"}`}>
          {review.location} · {review.product}
        </p>
      </div>
    </article>
  )
}

export default function ArkeReviews() {
  const track = [...reviews, ...reviews]

  return (
    <section className="border-y-2 border-black bg-[#fafafa] py-14 md:py-16" aria-label="Customer reviews">
      <div className="mx-auto mb-10 max-w-6xl px-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">Customer reviews</p>
        <h2 className="mt-3 text-3xl font-black tracking-tight text-black md:text-4xl">
          Worn daily. <span className="arke-holo-text">Loved</span> often.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-black/50">
          Real feedback from people who built ARKĒ into their everyday rotation.
        </p>
      </div>

      <div className="arke-reviews-marquee relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fafafa] to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fafafa] to-transparent sm:w-20" />

        <div className="arke-reviews-track flex w-max gap-5 px-6">
          {track.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} variant={i % 2 === 0 ? "light" : "dark"} />
          ))}
        </div>
      </div>
    </section>
  )
}
