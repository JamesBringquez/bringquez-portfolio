import { useState } from "react"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  MagnifyingGlass,
  Funnel,
  Plus,
  Minus,
} from "@phosphor-icons/react"
import ArkePattern from "./ArkePattern"
import ArkeProductImage, { type ArkeProductVisual } from "./ArkeProductImage"

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Accessories"] as const

type Product = {
  id: number
  name: string
  price: number
  category: string
  tag: string | null
  visual: ArkeProductVisual
  /** Add a path like `/images/arke/essential-tee.jpg` when you have real product photos */
  image?: string
}

const products: Product[] = [
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

export default function ArkeStore() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All")
  const [cart, setCart] = useState<Record<number, number>>({})
  const [cartOpen, setCartOpen] = useState(false)

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory)

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0)
  const cartTotal = products.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0)

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }

  const adjustQty = (id: number, delta: number) => {
    setCart((prev) => {
      const next = (prev[id] ?? 0) + delta
      if (next <= 0) {
        const { [id]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [id]: next }
    })
  }

  return (
    <div className="arke-store min-h-screen overflow-x-hidden bg-white font-sans text-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="arke-holo-bar h-0.5 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/projects/arke-clothing" className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="arke-holo-text truncate text-xl font-black tracking-[0.2em] sm:text-2xl sm:tracking-[0.35em]">
              ARKĒ
            </span>
            <span className="hidden h-8 w-px bg-black/15 sm:block" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.45em] text-black/45 sm:block">
              Clothing Co.
            </span>
          </a>

          <nav className="hidden gap-8 text-xs font-bold uppercase tracking-widest text-black/50 md:flex">
            {["New Arrivals", "Collections", "About"].map((item) => (
              <span key={item} className="cursor-pointer hover:text-black">
                {item}
              </span>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-10 w-10 items-center justify-center border-2 border-black bg-white sm:flex"
            >
              <MagnifyingGlass size={18} weight="bold" />
            </button>
            <button
              type="button"
              aria-label="Open shopping bag"
              aria-expanded={cartOpen}
              onClick={() => setCartOpen(!cartOpen)}
              className="relative flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 border-2 border-black bg-black px-3 text-sm font-bold uppercase tracking-wider text-white sm:px-4"
            >
              <ShoppingBag size={18} weight="bold" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-white text-[10px] font-black text-black ring-2 ring-black">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0 bg-black/50"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="border-b-2 border-black bg-black px-6 py-5 text-white">
              <h2 className="text-lg font-black uppercase tracking-widest">Your Bag</h2>
              <p className="text-sm text-white/60">{cartCount} items</p>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cartCount === 0 ? (
                <p className="text-center text-sm text-black/40">Your bag is empty</p>
              ) : (
                <ul className="space-y-4">
                  {products
                    .filter((p) => cart[p.id])
                    .map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 border-b border-black/10 pb-4"
                      >
                        <div className="h-14 w-11 shrink-0 overflow-hidden border border-black/10">
                          <ArkeProductImage
                            name={p.name}
                            visual={p.visual}
                            image={p.image}
                            className="!h-full !min-h-0"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold">{p.name}</p>
                          <p className="text-sm text-black/50">${p.price}</p>
                        </div>
                        <div className="flex shrink-0 items-center gap-2">
                          <button
                            type="button"
                            onClick={() => adjustQty(p.id, -1)}
                            className="flex h-8 w-8 items-center justify-center border-2 border-black"
                          >
                            <Minus size={14} weight="bold" />
                          </button>
                          <span className="w-6 text-center text-sm font-black">{cart[p.id]}</span>
                          <button
                            type="button"
                            onClick={() => adjustQty(p.id, 1)}
                            className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black text-white"
                          >
                            <Plus size={14} weight="bold" />
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
            {cartCount > 0 && (
              <div className="border-t-2 border-black p-6">
                <div className="mb-4 flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="arke-holo-surface w-full border-2 border-black py-3.5 text-sm font-black uppercase tracking-widest text-black"
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}

      <section className="grid min-h-[70vh] border-b-2 border-black md:grid-cols-2">
        <div className="arke-holo-surface relative flex flex-col justify-center px-6 py-16 md:px-12 md:py-24">
          <ArkePattern className="pointer-events-none absolute right-4 top-4 h-32 w-32 text-black md:right-8 md:top-8 md:h-40 md:w-40" />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-lg"
          >
            <p className="text-xs font-black uppercase tracking-[0.45em] text-black/40">
              Spring / Summer 2026
            </p>
            <h1 className="mt-4 text-4xl font-black leading-[0.92] tracking-tight text-black sm:text-5xl md:text-6xl lg:text-7xl">
              Elevated
              <br />
              <span className="arke-holo-text">everyday</span>
              <br />
              streetwear.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-black/55">
              ARKĒ is a modern clothing label — clean silhouettes, premium fabrics, and a
              signature holographic finish on select pieces. Designed for daily wear, built to
              stand out.
            </p>
            <button
              type="button"
              className="mt-10 border-2 border-black bg-black px-8 py-3.5 text-sm font-black uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
            >
              Shop New Arrivals
            </button>
          </motion.div>
        </div>

        <div className="relative flex flex-col items-center justify-center bg-black px-6 py-16 text-center">
          <ArkePattern className="h-48 w-48 text-white opacity-90 md:h-64 md:w-64" />
          <div className="absolute inset-0 arke-holo-overlay opacity-25" />
          <p className="relative z-10 mt-8 max-w-xs text-sm leading-relaxed text-white/50">
            Free shipping on orders over $150. Easy returns within 30 days.
          </p>
          <p className="arke-holo-text-light relative z-10 mt-6 text-4xl font-black tracking-[0.3em] md:text-5xl">
            ARKĒ
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-4">
          <h2 className="text-2xl font-black uppercase tracking-wide">Shop All</h2>
          <p className="mt-1 text-sm text-black/50">
            Curated essentials and statement pieces for men and women.
          </p>
        </div>

        <div className="mb-10 flex flex-wrap items-center gap-3">
          <Funnel size={18} weight="bold" className="text-black/40" />
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? "bg-black text-white"
                  : "border-2 border-black/15 bg-white text-black/50 hover:border-black"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group overflow-hidden border-2 border-black bg-white"
            >
              <div className="arke-holo-surface relative aspect-[4/5] overflow-hidden">
                <ArkeProductImage
                  name={product.name}
                  visual={product.visual}
                  image={product.image}
                  className="relative z-0"
                />
                {product.tag && (
                  <span className="absolute left-0 top-0 z-10 bg-black px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                    {product.tag}
                  </span>
                )}
              </div>
              <div className="border-t-2 border-black bg-black p-5 text-white">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/45">
                  {product.category}
                </p>
                <h3 className="mt-1 font-black">{product.name}</h3>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-xl font-black">${product.price}</span>
                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="arke-holo-surface min-h-11 w-full border border-white/30 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black transition-all hover:border-white sm:w-auto"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </main>

      <section className="border-t-2 border-black bg-[#fafafa] px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="arke-holo-text text-3xl font-black tracking-[0.2em]">ARKĒ</h2>
          <p className="mt-4 text-lg leading-relaxed text-black/55">
            We believe clothing should feel intentional — quality materials, thoughtful cuts, and
            details that catch the light. Discover the collection and find your next everyday
            favorite.
          </p>
        </div>
      </section>

      <footer className="border-t-2 border-black bg-black px-6 py-10 text-center">
        <p className="arke-holo-text-light text-lg font-black tracking-[0.35em]">ARKĒ</p>
        <p className="mt-2 text-sm text-white/40">Modern Clothing · Est. 2026</p>
        <p className="mt-1 text-xs text-white/30">Customer care: hello@arke-clothing.com</p>
        <a
          href="/"
          className="mt-4 inline-block text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white"
        >
          ← Back to Portfolio
        </a>
      </footer>

      <style>{`
        /* Holographic animated text — ARKĒ brand */
        .arke-holo-text {
          background: linear-gradient(
            90deg,
            #0a0a0a 0%,
            #0a0a0a 30%,
            #f0abfc 40%,
            #c4b5fd 48%,
            #93c5fd 55%,
            #5eead4 62%,
            #0a0a0a 72%,
            #0a0a0a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: arke-holo-shift 4s linear infinite;
        }
        .arke-holo-bar {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 182, 220, 0.9),
            rgba(196, 181, 253, 0.95),
            rgba(147, 197, 253, 0.95),
            rgba(94, 234, 212, 0.9),
            transparent
          );
          background-size: 200% 100%;
          animation: arke-holo-shift 3.5s linear infinite;
        }
        /* Holographic shimmer on white product surfaces */
        .arke-holo-surface {
          position: relative;
          background: #ffffff;
          overflow: hidden;
        }
        .arke-holo-surface::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 0%,
            transparent 35%,
            rgba(255, 182, 220, 0.22) 42%,
            rgba(196, 181, 253, 0.28) 48%,
            rgba(147, 197, 253, 0.26) 54%,
            rgba(94, 234, 212, 0.2) 60%,
            transparent 68%,
            transparent 100%
          );
          background-size: 250% 100%;
          animation: arke-holo-shift 6s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: multiply;
        }
        .arke-holo-overlay {
          background: linear-gradient(
            135deg,
            rgba(255, 182, 220, 0.2),
            rgba(147, 197, 253, 0.25),
            rgba(94, 234, 212, 0.2)
          );
          background-size: 200% 200%;
          animation: arke-holo-shift 5s ease infinite;
        }
        .group:hover .arke-holo-surface::after {
          animation-duration: 3s;
        }
        .arke-holo-text-light {
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #ffffff 28%,
            #f0abfc 38%,
            #c4b5fd 46%,
            #93c5fd 54%,
            #5eead4 62%,
            #ffffff 72%,
            #ffffff 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: arke-holo-shift 4s linear infinite;
        }
        @keyframes arke-holo-shift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }
      `}</style>
    </div>
  )
}
