import type { ArkeProductVisual } from "../ArkeProductImage"

export const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"] as const

export type ArkeCategory = (typeof categories)[number]

export type ArkeLogoVariant = "dark" | "light"

export type ArkeProduct = {
  id: number
  slug: string
  name: string
  /** Price in Philippine Peso (₱) */
  price: number
  category: string
  tag: string | null
  visual: ArkeProductVisual
  logoVariant: ArkeLogoVariant
  designNote: string
  description: string
  material: string
  fit: string
  sizes: string[]
  image: string
  modelImage: string
}

export const products: ArkeProduct[] = [
  {
    id: 1,
    slug: "essential-tee",
    name: "Essential Tee",
    price: 990,
    category: "Tops",
    tag: "Core",
    visual: "tee",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · pixel trace · holo side accent",
    description:
      "A heavyweight black tee built for daily rotation — stealth ARKĒ mark on the chest, pixel trace detailing, and a thin holo accent stripe that catches light without overpowering the look.",
    material: "240gsm cotton jersey",
    fit: "Relaxed regular · true to size",
    sizes: ["S", "M", "L", "XL"],
    image: "/images/arke/arke-essential-tee.png",
    modelImage: "/images/arke/models/arke-model-essential-tee.png",
  },
  {
    id: 2,
    slug: "archive-hoodie",
    name: "Archive Hoodie",
    price: 2890,
    category: "Outerwear",
    tag: "Flagship",
    visual: "hoodie",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · holo pocket trim",
    description:
      "The flagship pullover — solid black fleece with the stealth logo on chest and holo trim along the kangaroo pocket. Premium weight for tropical evenings and air-conditioned commutes alike.",
    material: "380gsm cotton-poly fleece",
    fit: "Oversized drop shoulder · size down for fitted",
    sizes: ["S", "M", "L", "XL"],
    image: "/images/arke/arke-archive-hoodie.png",
    modelImage: "/images/arke/models/arke-model-archive-hoodie.png",
  },
  {
    id: 3,
    slug: "structured-cargo",
    name: "Structured Cargo",
    price: 2450,
    category: "Bottoms",
    tag: "Bestseller",
    visual: "cargo",
    logoVariant: "dark",
    designNote: "Black cargo · stealth logo on black thigh panel · holo belt loop",
    description:
      "Tactical-inspired cargos with a sharp taper and deep pockets. Stealth ARKĒ mark on the black thigh panel — structured enough for streetwear, comfortable enough for all-day wear.",
    material: "Cotton twill with stretch",
    fit: "Tapered leg · mid-rise",
    sizes: ["28", "30", "32", "34"],
    image: "/images/arke/arke-structured-cargo.png",
    modelImage: "/images/arke/models/arke-model-structured-cargo.png",
  },
  {
    id: 4,
    slug: "pearl-windbreaker",
    name: "Pearl Windbreaker",
    price: 3690,
    category: "Outerwear",
    tag: "New",
    visual: "windbreaker",
    logoVariant: "light",
    designNote: "White shell · light logo chest · black shoulders · holo zip line",
    description:
      "Lightweight shell for Philippine weather — pearl white body, black angular shoulder panels, and a holo-accent zip track. Packable, breathable, and built to layer.",
    material: "Ripstop nylon · DWR finish",
    fit: "Regular · room for layering",
    sizes: ["S", "M", "L", "XL"],
    image: "/images/arke/arke-pearl-windbreaker.png",
    modelImage: "/images/arke/models/arke-model-pearl-windbreaker.png",
  },
  {
    id: 5,
    slug: "monochrome-cap",
    name: "Monochrome Cap",
    price: 790,
    category: "Accessories",
    tag: null,
    visual: "cap",
    logoVariant: "dark",
    designNote: "Black crown · stealth logo front · white brim · holo underbrim",
    description:
      "Six-panel cap with a crisp white flat brim and stealth logo on the black crown. Holo underbrim line adds a subtle flash when you tilt your head.",
    material: "Cotton twill · structured front",
    fit: "Adjustable strap · one size",
    sizes: ["One Size"],
    image: "/images/arke/arke-monochrome-cap.png",
    modelImage: "/images/arke/models/arke-model-monochrome-cap.png",
  },
  {
    id: 6,
    slug: "layered-long-sleeve",
    name: "Layered Long Sleeve",
    price: 1290,
    category: "Tops",
    tag: null,
    visual: "longsleeve",
    logoVariant: "dark",
    designNote: "Black base · stealth logo chest · holo collar line",
    description:
      "An everyday long sleeve in solid black with the stealth chest logo and a holo accent at the inner collar. Soft hand-feel, clean silhouette — the layer you reach for first.",
    material: "200gsm cotton interlock",
    fit: "Regular · slightly long body",
    sizes: ["S", "M", "L", "XL"],
    image: "/images/arke/arke-layered-longsleeve.png",
    modelImage: "/images/arke/models/arke-model-layered-longsleeve.png",
  },
]

export const lookbookHero = "/images/arke/models/arke-model-lookbook-hero.png"

/** Hero homepage showcase — 16:9 product-only editorial shots (clothesline hang). Catalog 3:2 assets unchanged. */
export const heroShowcase = [
  {
    id: 1,
    slug: "essential-tee",
    name: "Essential Tee",
    tag: "Core" as const,
    image: "/images/arke/showcase/arke-showcase-essential-tee.png",
  },
  {
    id: 2,
    slug: "archive-hoodie",
    name: "Archive Hoodie",
    tag: "Flagship" as const,
    image: "/images/arke/showcase/arke-showcase-archive-hoodie.png",
  },
  {
    id: 3,
    slug: "structured-cargo",
    name: "Structured Cargo",
    tag: "Bestseller" as const,
    image: "/images/arke/showcase/arke-showcase-structured-cargo.png",
  },
  {
    id: 4,
    slug: "pearl-windbreaker",
    name: "Pearl Windbreaker",
    tag: "New" as const,
    image: "/images/arke/showcase/arke-showcase-pearl-windbreaker.png",
  },
  {
    id: 5,
    slug: "monochrome-cap",
    name: "Monochrome Cap",
    tag: null,
    image: "/images/arke/showcase/arke-showcase-monochrome-cap.png",
  },
  {
    id: 6,
    slug: "layered-long-sleeve",
    name: "Layered Long Sleeve",
    tag: null,
    image: "/images/arke/showcase/arke-showcase-layered-longsleeve.png",
  },
] as const

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
export const ARKE_FAVORITES = `${ARKE_BASE}/favorites`
export const ARKE_ABOUT = `${ARKE_BASE}/about`
export const ARKE_FAVICON = "/images/arke-favicon.png"
export const DEFAULT_FAVICON = "/images/logo.png"
export const DEFAULT_TITLE = "James Matthew P. Bringquez | Portfolio"

export function getProductBySlug(slug: string): ArkeProduct | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductUrl(slug: string): string {
  return `${ARKE_COLLECTIONS}/${slug}`
}

export function getReviewsForProduct(productName: string): ArkeReview[] {
  return reviews.filter((r) => r.product === productName)
}

export function searchProducts(query: string): ArkeProduct[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  return products.filter((p) => {
    const haystack = [
      p.name,
      p.category,
      p.description,
      p.designNote,
      p.material,
      p.fit,
      p.slug.replace(/-/g, " "),
      p.tag ?? "",
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(q) || q.split(/\s+/).every((word) => haystack.includes(word))
  })
}
