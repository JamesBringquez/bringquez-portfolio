import type { ArkeProductVisual } from "../ArkeProductImage"

export const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"] as const

export type ArkeCategory = (typeof categories)[number]

export type ArkeProduct = {
  id: number
  name: string
  price: number
  category: string
  tag: string | null
  visual: ArkeProductVisual
  image?: string
}

export const products: ArkeProduct[] = [
  {
    id: 1,
    name: "Essential Tee",
    price: 48,
    category: "Tops",
    tag: "Core",
    visual: "tee",
    image: "/images/arke/arke-essential-tee.png",
  },
  {
    id: 2,
    name: "Holo Signature Hoodie",
    price: 128,
    category: "Outerwear",
    tag: "Flagship",
    visual: "hoodie",
    image: "/images/arke/arke-holo-hoodie.png",
  },
  {
    id: 3,
    name: "Structured Cargo",
    price: 98,
    category: "Bottoms",
    tag: "Bestseller",
    visual: "cargo",
    image: "/images/arke/arke-structured-cargo.png",
  },
  {
    id: 4,
    name: "Pearl Windbreaker",
    price: 165,
    category: "Outerwear",
    tag: "New",
    visual: "windbreaker",
    image: "/images/arke/arke-pearl-windbreaker.png",
  },
  {
    id: 5,
    name: "Monochrome Cap",
    price: 42,
    category: "Accessories",
    tag: null,
    visual: "cap",
    image: "/images/arke/arke-monochrome-cap.png",
  },
  {
    id: 6,
    name: "Layered Long Sleeve",
    price: 62,
    category: "Tops",
    tag: null,
    visual: "longsleeve",
    image: "/images/arke/arke-layered-longsleeve.png",
  },
]

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
    product: "Holo Signature Hoodie",
    rating: 5,
    quote:
      "The holo finish catches light in the best way — premium weight, clean fit, and it still looks sharp after a full day out.",
  },
  {
    id: 2,
    name: "Jonah S.",
    location: "Cebu",
    product: "Essential Tee",
    rating: 5,
    quote:
      "Simple on first look, but the fabric and cut are clearly above fast fashion. Already ordered a second color.",
  },
  {
    id: 3,
    name: "Elise T.",
    location: "Davao",
    product: "Pearl Windbreaker",
    rating: 5,
    quote:
      "Light enough for tropical evenings, structured enough to feel elevated. The pearl tone goes with everything I own.",
  },
  {
    id: 4,
    name: "Andre L.",
    location: "Quezon City",
    product: "Structured Cargo",
    rating: 5,
    quote:
      "Best cargos I've tried in this price range — sharp silhouette, deep pockets, and the fabric holds its shape all day.",
  },
  {
    id: 5,
    name: "Sofia M.",
    location: "Makati",
    product: "Layered Long Sleeve",
    rating: 5,
    quote:
      "Layering piece done right. Soft hand-feel, not too boxy, and the neckline sits perfectly under a jacket.",
  },
  {
    id: 6,
    name: "Carlos D.",
    location: "Baguio",
    product: "Monochrome Cap",
    rating: 5,
    quote:
      "Minimal cap with a solid structure — sits clean, no awkward bulge, and the monochrome finish matches the whole line.",
  },
]

export const ARKE_BASE = "/projects/arke-clothing"
export const ARKE_COLLECTIONS = `${ARKE_BASE}/collections`
export const ARKE_ABOUT = `${ARKE_BASE}/about`
export const ARKE_FAVICON = "/images/arke-favicon.png"
export const DEFAULT_FAVICON = "/images/logo.png"
export const DEFAULT_TITLE = "James Matthew P. Bringquez | Portfolio"
