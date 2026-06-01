/** Branded product placeholders — replace with real photos via `image` on each product */

export type ArkeProductVisual =
  | "tee"
  | "hoodie"
  | "cargo"
  | "windbreaker"
  | "cap"
  | "longsleeve"

interface ArkeProductImageProps {
  name: string
  visual: ArkeProductVisual
  /** When set, shows a real photo instead of the template */
  image?: string
  className?: string
}

const holoGradientId = "arke-holo-grad"

function ProductSvg({ visual }: { visual: ArkeProductVisual }) {
  const stroke = "#0a0a0a"
  const fill = "#f5f5f5"
  const holo = `url(#${holoGradientId})`

  switch (visual) {
    case "tee":
      return (
        <>
          <path
            d="M95 52 L75 58 L68 95 L132 95 L125 58 L105 52 L100 44 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M100 44 L100 95" stroke={stroke} strokeWidth="1.5" opacity="0.2" />
          <ellipse cx="100" cy="48" rx="22" ry="8" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )
    case "hoodie":
      return (
        <>
          <path
            d="M92 50 L72 56 L65 98 L135 98 L128 56 L108 50 L100 40 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M72 56 Q55 62 48 78" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M128 56 Q145 62 152 78" fill="none" stroke={stroke} strokeWidth="2" />
          <path
            d="M88 58 Q100 72 112 58"
            fill="none"
            stroke={holo}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <ellipse cx="100" cy="44" rx="24" ry="9" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )
    case "cargo":
      return (
        <>
          <path
            d="M78 42 L122 42 L128 98 L72 98 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M78 55 L122 55" stroke={stroke} strokeWidth="1.5" />
          <path d="M78 68 L122 68" stroke={stroke} strokeWidth="1.5" />
          <rect x="82" y="72" width="14" height="18" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="104" y="72" width="14" height="18" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M100 42 L100 98" stroke={stroke} strokeWidth="1" opacity="0.15" />
        </>
      )
    case "windbreaker":
      return (
        <>
          <path
            d="M90 48 L70 54 L64 96 L136 96 L130 54 L110 48 L100 38 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path
            d="M90 48 L100 38 L110 48"
            fill="none"
            stroke={holo}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <path d="M64 96 L48 102" stroke={stroke} strokeWidth="2" />
          <path d="M136 96 L152 102" stroke={stroke} strokeWidth="2" />
          <path d="M100 48 L100 96" stroke={stroke} strokeWidth="1" opacity="0.12" />
        </>
      )
    case "cap":
      return (
        <>
          <ellipse cx="100" cy="72" rx="38" ry="10" fill={fill} stroke={stroke} strokeWidth="2" />
          <path
            d="M62 72 Q100 48 138 72"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M138 72 L155 76" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
          <path
            d="M78 58 Q100 42 122 58"
            fill="none"
            stroke={holo}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )
    case "longsleeve":
      return (
        <>
          <path
            d="M95 50 L75 56 L68 98 L132 98 L125 56 L105 50 L100 42 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M75 56 L58 72" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M125 56 L142 72" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M100 42 L100 98" stroke={stroke} strokeWidth="1.5" opacity="0.15" />
          <ellipse cx="100" cy="46" rx="20" ry="7" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )
  }
}

export default function ArkeProductImage({
  name,
  visual,
  image,
  className = "",
}: ArkeProductImageProps) {
  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`h-full w-full object-cover object-center ${className}`}
      />
    )
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col items-center justify-center bg-[#f0f0f0] ${className}`}
      aria-hidden={false}
      role="img"
      aria-label={`${name} — placeholder product image`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "linear-gradient(105deg, transparent 30%, rgba(255,182,220,0.35) 45%, rgba(147,197,253,0.3) 55%, transparent 70%)",
        }}
      />
      <svg
        viewBox="0 0 200 120"
        className="relative z-10 h-[55%] w-[75%] max-w-[200px]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={holoGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f0abfc" />
            <stop offset="35%" stopColor="#c4b5fd" />
            <stop offset="65%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
        </defs>
        <ProductSvg visual={visual} />
      </svg>
      <p className="relative z-10 mt-2 px-4 text-center text-[9px] font-bold uppercase tracking-[0.35em] text-black/25">
        ARKĒ · Placeholder
      </p>
    </div>
  )
}
