/** Product display — branded mockups with logo, or optional photo assets */

import ArkeProductMockup, { type ArkeMockupView } from "./arke/ArkeProductMockup"

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
  /** Optional flat product photo — overrides mockup when set */
  image?: string
  /** Optional model photo — shown before hover when both image and modelImage are set */
  modelImage?: string
  className?: string
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

function BrandedMockup({
  visual,
  view,
  className,
}: {
  visual: ArkeProductVisual
  view: ArkeMockupView
  className?: string
}) {
  return (
    <div className={`flex h-full w-full items-center justify-center bg-[#ececec] ${className}`}>
      <ArkeProductMockup visual={visual} view={view} className="max-h-full max-w-full" />
    </div>
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
    <div className={`relative h-full w-full ${className}`} role="img" aria-label={`${name} — ARKĒ product mockup`}>
      <BrandedMockup visual={visual} view="primary" className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
      <BrandedMockup visual={visual} view="alternate" className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  )
}
