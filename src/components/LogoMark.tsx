interface LogoMarkProps {
  size?: number
  className?: string
  alt?: string
}

export default function LogoMark({
  size = 40,
  className = "",
  alt = "James Matthew P. Bringquez logo",
}: LogoMarkProps) {
  return (
    <img
      src="/images/logo.png"
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  )
}
