/** Programmatic ARKĒ product mockups — black/white base, logo placement, holo as accent only */

import type { ArkeProductVisual } from "../ArkeProductImage"

export const ARKE_LOGO = "/images/arke/brand/arke-logo.png"
export const ARKE_LOGO_STEALTH = "/images/arke/brand/arke-logo-dark.png"
export const ARKE_LOGO_LIGHT = "/images/arke/brand/arke-logo-light.png"

export type ArkeMockupView = "primary" | "alternate"

interface ArkeProductMockupProps {
  visual: ArkeProductVisual
  view?: ArkeMockupView
  className?: string
}

const INK = "#0a0a0a"
const PEARL = "#f5f5f5"
const WHITE = "#ffffff"
const MUTED = "#1a1a1a"

function HoloDefs() {
  return (
    <defs>
      <linearGradient id="arke-holo-accent" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#93c5fd" />
        <stop offset="35%" stopColor="#c4b5fd" />
        <stop offset="65%" stopColor="#f0abfc" />
        <stop offset="100%" stopColor="#5eead4" />
      </linearGradient>
      <linearGradient id="arke-holo-accent-h" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#5eead4" stopOpacity="0.2" />
        <stop offset="50%" stopColor="#c4b5fd" stopOpacity="0.95" />
        <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.2" />
      </linearGradient>
    </defs>
  )
}

function Logo({
  x,
  y,
  w,
  h,
  opacity = 1,
  variant = "light",
}: {
  x: number
  y: number
  w: number
  h: number
  opacity?: number
  variant?: "light" | "stealth"
}) {
  return (
    <image
      href={variant === "stealth" ? ARKE_LOGO_STEALTH : ARKE_LOGO_LIGHT}
      x={x}
      y={y}
      width={w}
      height={h}
      preserveAspectRatio="xMidYMid meet"
      opacity={opacity}
    />
  )
}

/** Digital pixel trail — echoes the logo's glitch squares */
function PixelTrail({
  x,
  y,
  count = 4,
  size = 3,
  gap = 4,
  direction = "left",
}: {
  x: number
  y: number
  count?: number
  size?: number
  gap?: number
  direction?: "left" | "right" | "down"
}) {
  const squares = Array.from({ length: count }, (_, i) => {
    const offset = i * (size + gap)
    const opacity = 0.15 + (count - i) * 0.12
    if (direction === "left") {
      return (
        <rect
          key={i}
          x={x - offset}
          y={y + (i % 2) * 2}
          width={size}
          height={size}
          fill={INK}
          opacity={opacity}
        />
      )
    }
    if (direction === "right") {
      return (
        <rect
          key={i}
          x={x + offset}
          y={y + (i % 2) * 2}
          width={size}
          height={size}
          fill={WHITE}
          opacity={opacity}
        />
      )
    }
    return (
      <rect
        key={i}
        x={x + (i % 2) * 2}
        y={y + offset}
        width={size}
        height={size}
        fill={INK}
        opacity={opacity}
      />
    )
  })
  return <g>{squares}</g>
}

function HoloAccentLine({
  x1,
  y1,
  x2,
  y2,
  width = 1.5,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  width?: number
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="url(#arke-holo-accent-h)"
      strokeWidth={width}
      strokeLinecap="round"
    />
  )
}

function TeeMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#ececec" />
        <path
          d="M72 58 L58 64 L52 108 L148 108 L142 64 L128 58 L100 48 L72 58 Z"
          fill={INK}
          stroke={INK}
          strokeWidth="1.5"
        />
        <rect x="68" y="72" width="64" height="36" rx="1" fill={MUTED} />
        <Logo x={74} y={78} w={52} h={24} variant="stealth" />
        <PixelTrail x={68} y={88} count={5} direction="left" />
        <HoloAccentLine x1={142} y1={70} x2={142} y2={106} width={2} />
        <text x="100" y="130" textAnchor="middle" fill={WHITE} opacity="0.35" fontSize="6" fontWeight="700" letterSpacing="2">
          BACK
        </text>
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#ececec" />
      <path
        d="M72 58 L58 64 L52 108 L148 108 L142 64 L128 58 L100 48 L72 58 Z"
        fill={INK}
        stroke={INK}
        strokeWidth="1.5"
      />
      <Logo x={62} y={68} w={36} h={16} variant="stealth" />
      <PixelTrail x={58} y={74} count={4} direction="left" />
      <rect x="134" y="66" width="3" height="38" fill="url(#arke-holo-accent)" opacity="0.55" />
      <line x1="100" y1="48" x2="100" y2="108" stroke={WHITE} strokeWidth="0.5" opacity="0.08" />
    </>
  )
}

function HoodieMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#e8e8e8" />
        <path
          d="M68 52 L50 60 L42 112 L158 112 L150 60 L132 52 L100 38 L68 52 Z"
          fill={PEARL}
          stroke={INK}
          strokeWidth="2"
        />
        <path d="M50 60 Q32 68 24 88" fill="none" stroke={INK} strokeWidth="2" />
        <path d="M150 60 Q168 68 176 88" fill="none" stroke={INK} strokeWidth="2" />
        <rect x="72" y="78" width="56" height="28" rx="1" fill={INK} />
        <Logo x={78} y={84} w={44} h={16} variant="stealth" />
        <HoloAccentLine x1={100} y1={112} x2={100} y2={118} width={3} />
        <rect x="42" y="108" width="116" height="6" fill={INK} />
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#e8e8e8" />
      <path
        d="M68 52 L50 60 L42 112 L158 112 L150 60 L132 52 L100 38 L68 52 Z"
        fill={PEARL}
        stroke={INK}
        strokeWidth="2"
      />
      <path d="M50 60 Q32 68 24 88" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M150 60 Q168 68 176 88" fill="none" stroke={INK} strokeWidth="2" />
      <rect x="68" y="68" width="64" height="40" rx="1" fill={INK} />
      <Logo x={74} y={76} w={52} h={24} variant="stealth" />
      <rect x="78" y="112" width="44" height="32" rx="2" fill={MUTED} stroke={INK} strokeWidth="1" />
      <HoloAccentLine x1={78} y1={144} x2={122} y2={144} width={1.5} />
      <rect x="42" y="108" width="116" height="6" fill={INK} />
    </>
  )
}

function CargoMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#ececec" />
        <path d="M62 52 L138 52 L142 118 L58 118 Z" fill={INK} stroke={INK} strokeWidth="2" />
        <path d="M62 52 L58 44 L142 44 L138 52" fill="none" stroke={INK} strokeWidth="2" />
        <rect x="66" y="62" width="28" height="22" fill="none" stroke={WHITE} strokeWidth="1.5" opacity="0.7" />
        <rect x="106" y="62" width="28" height="22" fill="none" stroke={WHITE} strokeWidth="1.5" opacity="0.7" />
        <rect x="108" y="78" width="22" height="14" fill={MUTED} opacity="0.95" />
        <Logo x={110} y={80} w={18} h={10} opacity={0.9} variant="stealth" />
        <circle cx="132" cy="48" r="3" fill="url(#arke-holo-accent)" opacity="0.7" />
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#ececec" />
      <path d="M62 52 L138 52 L142 118 L58 118 Z" fill={INK} stroke={INK} strokeWidth="2" />
      <path d="M62 52 L58 44 L142 44 L138 52" fill="none" stroke={INK} strokeWidth="2" />
      <path d="M66 70 L94 70 L96 100 L64 100 Z" fill={MUTED} opacity="0.95" />
      <Logo x={68} y={78} w={26} h={14} variant="stealth" />
      <PixelTrail x={66} y={84} count={3} direction="left" />
      <rect x="106" y="62" width="28" height="22" fill="none" stroke={WHITE} strokeWidth="1.5" opacity="0.5" />
      <rect x="66" y="62" width="28" height="22" fill="none" stroke={WHITE} strokeWidth="1.5" opacity="0.5" />
      <HoloAccentLine x1={58} y1={44} x2={72} y2={44} width={2} />
    </>
  )
}

function WindbreakerMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#e5e5e5" />
        <path d="M72 46 L128 46 L148 62 L154 118 L46 118 L52 62 Z" fill={WHITE} stroke={INK} strokeWidth="2" />
        <path d="M72 46 L52 62 L46 118" fill={INK} opacity="0.9" />
        <path d="M128 46 L148 62 L154 118" fill={INK} opacity="0.9" />
        <rect x="72" y="72" width="56" height="32" rx="1" fill={INK} />
        <Logo x={78} y={80} w={44} h={16} variant="stealth" />
        <line x1="100" y1="46" x2="100" y2="118" stroke={INK} strokeWidth="0.5" opacity="0.1" />
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#e5e5e5" />
      <path d="M72 46 L128 46 L148 62 L154 118 L46 118 L52 62 Z" fill={WHITE} stroke={INK} strokeWidth="2" />
      <path d="M72 46 L52 62 L72 78 Z" fill={INK} />
      <path d="M128 46 L148 62 L128 78 Z" fill={INK} />
      <Logo x={58} y={66} w={28} h={12} variant="light" />
      <line x1="100" y1="46" x2="100" y2="118" stroke={INK} strokeWidth="1" opacity="0.12" />
      <HoloAccentLine x1={100} y1={50} x2={100} y2={112} width={1.2} />
      <PixelTrail x={148} y={70} count={4} direction="right" />
    </>
  )
}

function CapMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#ececec" />
        <ellipse cx="100" cy="88" rx="44" ry="12" fill={INK} stroke={INK} strokeWidth="2" />
        <path d="M56 88 Q100 48 144 88" fill={INK} stroke={INK} strokeWidth="2" />
        <path d="M46 90 L154 90" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
        <rect x="138" y="82" width="8" height="4" rx="1" fill="url(#arke-holo-accent)" opacity="0.65" />
        <line x1="56" y1="88" x2="44" y2="92" stroke={INK} strokeWidth="2" />
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#ececec" />
      <ellipse cx="100" cy="88" rx="44" ry="12" fill={INK} stroke={INK} strokeWidth="2" />
      <path d="M56 88 Q100 48 144 88" fill={INK} stroke={INK} strokeWidth="2" />
      <path d="M46 90 L154 90" stroke={WHITE} strokeWidth="3" strokeLinecap="round" />
      <Logo x={72} y={62} w={56} h={22} variant="stealth" />
      <PixelTrail x={68} y={72} count={3} direction="left" />
      <HoloAccentLine x1={46} y1={91} x2={154} y2={91} width={1} />
    </>
  )
}

function LongsleeveMockup({ view }: { view: ArkeMockupView }) {
  if (view === "alternate") {
    return (
      <>
        <rect x="0" y="0" width="200" height="280" fill="#ececec" />
        <path
          d="M72 58 L58 64 L52 112 L148 112 L142 64 L128 58 L100 48 L72 58 Z"
          fill={WHITE}
          stroke={INK}
          strokeWidth="2"
        />
        <path d="M52 72 L36 92" fill={INK} stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <path d="M148 72 L164 92" fill={INK} stroke={INK} strokeWidth="8" strokeLinecap="round" />
        <line x1="40" y1="78" x2="48" y2="98" stroke={WHITE} strokeWidth="0.8" opacity="0.4" />
        <line x1="44" y1="76" x2="52" y2="96" stroke={WHITE} strokeWidth="0.8" opacity="0.3" />
        <line x1="152" y1="78" x2="160" y2="98" stroke={WHITE} strokeWidth="0.8" opacity="0.4" />
        <HoloAccentLine x1={88} y1={48} x2={112} y2={48} width={2} />
      </>
    )
  }

  return (
    <>
      <rect x="0" y="0" width="200" height="280" fill="#ececec" />
      <path
        d="M72 58 L58 64 L52 112 L148 112 L142 64 L128 58 L100 48 L72 58 Z"
        fill={WHITE}
        stroke={INK}
        strokeWidth="2"
      />
      <path d="M52 72 L36 92" fill={INK} stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <path d="M148 72 L164 92" fill={INK} stroke={INK} strokeWidth="8" strokeLinecap="round" />
      <rect x="58" y="68" width="84" height="28" rx="1" fill={INK} />
      <Logo x={64} y={74} w={72} h={16} variant="stealth" />
      <PixelTrail x={58} y={80} count={4} direction="left" />
      <HoloAccentLine x1={88} y1={48} x2={112} y2={48} width={1.5} />
    </>
  )
}

function MockupBody({ visual, view }: { visual: ArkeProductVisual; view: ArkeMockupView }) {
  switch (visual) {
    case "tee":
      return <TeeMockup view={view} />
    case "hoodie":
      return <HoodieMockup view={view} />
    case "cargo":
      return <CargoMockup view={view} />
    case "windbreaker":
      return <WindbreakerMockup view={view} />
    case "cap":
      return <CapMockup view={view} />
    case "longsleeve":
      return <LongsleeveMockup view={view} />
  }
}

export default function ArkeProductMockup({
  visual,
  view = "primary",
  className = "",
}: ArkeProductMockupProps) {
  return (
    <svg
      viewBox="0 0 200 280"
      className={`h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-hidden="true"
    >
      <HoloDefs />
      <MockupBody visual={visual} view={view} />
    </svg>
  )
}
