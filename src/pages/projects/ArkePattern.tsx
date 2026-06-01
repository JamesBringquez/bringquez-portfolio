/** Minimal geometric pattern for ARKĒ brand visuals */
export default function ArkePattern({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 40 L40 56 L24 72"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.35"
      />
      <path
        d="M160 120 L176 136 L160 152"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />
      <line x1="60" y1="32" x2="140" y2="32" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <line x1="48" y1="168" x2="120" y2="168" stroke="currentColor" strokeWidth="1.5" opacity="0.2" />
      <path
        d="M155 48 L172 78 H138 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        opacity="0.3"
      />
      <circle cx="48" cy="120" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.22" />
      <path
        d="M118 88 C118 82 124 78 128 82 C132 78 138 82 138 88 C138 96 128 104 128 104 C128 104 118 96 118 88 Z"
        fill="currentColor"
        opacity="0.18"
      />
    </svg>
  )
}
