import type { ArkeProductVisual } from "../ArkeProductImage"

export const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"] as const

export type ArkeCategory = (typeof categories)[number]

export type ArkeLogoVariant = "dark" | "light"

export type ArkeProduct = {
  id: number
  name: string
  price: number
  category: string
  tag: string | null
  visual: ArkeProductVisual
  /** Which ARKĒ logo treatment is used — dark stealth mark is black-garment only */
  logoVariant: ArkeLogoVariant
  designNote: string
  image: string
  modelImage: string
}

export const products: ArkeProduct[] = [
  {
    id: 1,
    name: "Essential Tee",
    price: 48,
    category: "Tops",
    tag: "Core",
    visual: "tee",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · pixel trace · holo side accent",
    image: "/images/arke/arke-essential-tee.png",
    modelImage: "/images/arke/models/arke-model-essential-tee.png",
  },
  {
    id: 2,
    name: "Archive Hoodie",
    price: 128,
    category: "Outerwear",
    tag: "Flagship",
    visual: "hoodie",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · holo pocket trim",
    image: "/images/arke/arke-archive-hoodie.png",
    modelImage: "/images/arke/models/arke-model-archive-hoodie.png",
  },
  {
    id: 3,
    name: "Structured Cargo",
    price: 98,
    category: "Bottoms",
    tag: "Bestseller",
    visual: "cargo",
    logoVariant: "light",
    designNote: "Black cargo · light logo on white thigh panel · holo belt loop",
    image: "/images/arke/arke-structured-cargo.png",
    modelImage: "/images/arke/models/arke-model-structured-cargo.png",
  },
  {
    id: 4,
    name: "Pearl Windbreaker",
    price: 165,
    category: "Outerwear",
    tag: "New",
    visual: "windbreaker",
    logoVariant: "light",
    designNote: "White shell · light logo chest · black shoulders · holo zip line",
    image: "/images/arke/arke-pearl-windbreaker.png",
    modelImage: "/images/arke/models/arke-model-pearl-windbreaker.png",
  },
  {
    id: 5,
    name: "Monochrome Cap",
    price: 42,
    category: "Accessories",
    tag: null,
    visual: "cap",
    logoVariant: "dark",
    designNote: "Black crown · stealth logo front · white brim · holo underbrim",
    image: "/images/arke/arke-monochrome-cap.png",
    modelImage: "/images/arke/models/arke-model-monochrome-cap.png",
  },
  {
    id: 6,
    name: "Layered Long Sleeve",
    price: 62,
    category: "Tops",
    tag: null,
    visual: "longsleeve",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · holo collar line",
    image: "/images/arke/arke-layered-longsleeve.png",
    modelImage: "/images/arke/models/arke-model-layered-longsleeve.png",
  },
]

export const lookbookHero = "/images/arke/models/arke-model-lookbook-hero.png"

export const lookbookFeatured = [
  { id: 2, name: "Archive Hoodie", modelImage: "/images/arke/models/arke-model-archive-hoodie.png" },
  { id: 4, name: "Pearl Windbreaker", modelImage: "/images/arke/models/arke-model-pearl-windbreaker.png" },
  { id: 1, name: "Essential Tee", modelImage: "/images/arke/models/arke-model-essential-tee.png" },
] as const

export type ArkeReview = {
  id: number
  name: string
  location: string
  product: string
  rating: number
  quote: string
}

export const reviews: ArkeReview[] = [
  {
    id: 1,
    name: "Mika R.",
    location: "Manila",
    product: "Archive Hoodie",
    rating: 5,
    quote:
      "The stealth logo hits clean on the black body — premium weight, sharp fit, and the holo trim is subtle enough for daily wear.",
  },
  {
    id: 2,
    name: "Jonah S.",
    location: "Cebu",
    product: "Essential Tee",
    rating: 5,
    quote:
      "Black tee with just enough detail — the pixel trace and chest logo feel intentional, not loud. Already ordered a second one.",
  },
  {
    id: 3,
    name: "Elise T.",
    location: "Davao",
    product: "Pearl Windbreaker",
    rating: 5,
    quote:
      "Light enough for tropical evenings, structured enough to feel elevated. The shoulder panels and logo placement are chef's kiss.",
  },
  {
    id: 4,
    name: "Andre L.",
    location: "Quezon City",
    product: "Structured Cargo",
    rating: 5,
    quote:
      "Best cargos I've tried in this price range — sharp silhouette, deep pockets, and the thigh panel logo is a nice touch.",
  },
  {
    id: 5,
    name: "Sofia M.",
    location: "Makati",
    product: "Layered Long Sleeve",
    rating: 5,
    quote:
      "Layering piece done right. Soft hand-feel, not too boxy, and the stealth chest logo ties the whole line together.",
  },
  {
    id: 6,
    name: "Carlos D.",
    location: "Baguio",
    product: "Monochrome Cap",
    rating: 5,
    quote:
      "Minimal cap with a solid structure — logo sits clean up front, and the holo underbrim catches light when you tilt your head.",
  },
]

export const ARKE_BASE = "/projects/arke-clothing"
export const ARKE_COLLECTIONS = `${ARKE_BASE}/collections`
export const ARKE_ABOUT = `${ARKE_BASE}/about`
export const ARKE_FAVICON = "/images/arke-favicon.png"
export const DEFAULT_FAVICON = "/images/logo.png"
export const DEFAULT_TITLE = "James Matthew P. Bringquez | Portfolio"
