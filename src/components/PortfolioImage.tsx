import { useState } from "react"
import { motion } from "framer-motion"

interface PortfolioImageProps {
  src: string
  alt: string
  className?: string
  wrapperClassName?: string
  priority?: boolean
}

export default function PortfolioImage({
  src,
  alt,
  className = "h-full w-full object-cover",
  wrapperClassName = "",
  priority = false,
}: PortfolioImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-ink/5" aria-hidden="true" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: loaded ? 1 : 0, scale: loaded ? 1 : 1.03 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      />
    </div>
  )
}
