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
  /** Flat product shot */
  image?: string
  /** Model lookbook shot — primary on cards when set */
  modelImage?: string
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
          <rect x="88" y="62" width="24" height="18" rx="2" fill={holo} opacity="0.85" />
        </>
      )
    case "cargo":
      return (
        <>
          <path
            d="M78 48 L122 48 L125 98 L75 98 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <rect x="82" y="58" width="14" height="12" fill="none" stroke={stroke} strokeWidth="1.5" />
          <rect x="104" y="58" width="14" height="12" fill="none" stroke={stroke} strokeWidth="1.5" />
          <path d="M78 48 L75 42 L125 42 L122 48" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )
    case "windbreaker":
      return (
        <>
          <path
            d="M90 42 L110 42 L130 55 L135 98 L65 98 L70 55 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M100 42 L100 98" stroke={stroke} strokeWidth="1" opacity="0.15" />
          <path d="M90 55 L70 55" stroke={stroke} strokeWidth="2" />
          <path d="M110 55 L130 55" stroke={stroke} strokeWidth="2" />
        </>
      )
    case "cap":
      return (
        <>
          <ellipse cx="100" cy="72" rx="38" ry="10" fill={fill} stroke={stroke} strokeWidth="2" />
          <path
            d="M72 72 Q100 38 128 72"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M62 74 L138 74" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
        </>
      )
    case "longsleeve":
      return (
        <>
          <path
            d="M95 52 L75 58 L68 98 L132 98 L125 58 L105 52 L100 44 Z"
            fill={fill}
            stroke={stroke}
            strokeWidth="2"
          />
          <path d="M68 70 L52 85" fill="none" stroke={stroke} strokeWidth="2" />
          <path d="M132 70 L148 85" fill="none" stroke={stroke} strokeWidth="2" />
          <ellipse cx="100" cy="46" rx="20" ry="7" fill="none" stroke={stroke} strokeWidth="2" />
        </>
      )
  }
}

function ProductPhoto({ src, alt, className }: { src: string; alt: string; className: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover object-top ${className}`}
    />
  )
}

export default function ArkeProductImage({
  name,
  visual,
  image,
  modelImage,
  className = "",
}: ArkeProductImageProps) {
  if (modelImage && image) {
    return (
      <div className={`relative h-full w-full ${className}`}>
        <ProductPhoto
          src={modelImage}
          alt={`${name} — model lookbook`}
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
        />
        <ProductPhoto
          src={image}
          alt={`${name} — product`}
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    )
  }

  const photo = modelImage ?? image
  if (photo) {
    return (
      <ProductPhoto
        src={photo}
        alt={modelImage ? `${name} — model lookbook` : name}
        className={className}
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
