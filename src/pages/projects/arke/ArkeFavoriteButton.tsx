import { motion } from "framer-motion"
import { Heart } from "@phosphor-icons/react"
import { useArkeFavorites } from "./ArkeFavoritesContext"

type ArkeFavoriteButtonProps = {
  productId: number
  className?: string
  size?: number
  /** Light icons on dark backgrounds */
  variant?: "light" | "dark"
}

export default function ArkeFavoriteButton({
  productId,
  className = "",
  size = 20,
  variant = "dark",
}: ArkeFavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useArkeFavorites()
  const active = isFavorite(productId)

  const idleColor = variant === "light" ? "text-white/70 hover:text-white" : "text-black/45 hover:text-black"
  const activeColor = variant === "light" ? "text-white" : "text-black"

  return (
    <motion.button
      type="button"
      aria-label={active ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggleFavorite(productId)
      }}
      whileTap={{ scale: 0.82 }}
      className={`relative flex h-10 w-10 items-center justify-center transition-colors ${idleColor} ${className}`}
    >
      {active && (
        <motion.span
          key={`ring-${productId}-${active}`}
          initial={{ scale: 0.6, opacity: 0.8 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 rounded-full border-2 border-black/25"
          aria-hidden
        />
      )}
      <motion.span
        key={active ? "filled" : "empty"}
        initial={{ scale: active ? 0.5 : 1, rotate: active ? -18 : 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 16 }}
        className="relative z-10"
      >
        <Heart
          size={size}
          weight={active ? "fill" : "regular"}
          className={active ? activeColor : undefined}
        />
      </motion.span>
    </motion.button>
  )
}
