import { useCallback, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom"
import { motion } from "framer-motion"
import {
  ShoppingBag,
  MagnifyingGlass,
  Plus,
  Minus,
  Heart,
} from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import { useArkeCart } from "./ArkeCartContext"
import { useArkeFavorites } from "./ArkeFavoritesContext"
import ArkeSearchPanel from "./ArkeSearchPanel"
import ArkeHoloStyles from "./ArkeHoloStyles"
import {
  ARKE_BASE,
  ARKE_ABOUT,
  ARKE_COLLECTIONS,
  ARKE_FAVORITES,
  ARKE_FAVICON,
  DEFAULT_FAVICON,
  DEFAULT_TITLE,
  products,
} from "./arkeData"
import { formatArkePrice } from "./arkeUtils"

export default function ArkeStoreLayout() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { cart, cartOpen, setCartOpen, cartCount, cartTotal, adjustQty, bagPulse, registerBagAnchor } =
    useArkeCart()
  const { favoriteCount, favoritePulse } = useArkeFavorites()
  const bagButtonRef = useRef<HTMLButtonElement>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const openSearch = useCallback(() => {
    setCartOpen(false)
    setSearchOpen(true)
  }, [setCartOpen])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((open) => {
          if (open) {
            setSearchQuery("")
            return false
          }
          setCartOpen(false)
          return true
        })
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [setCartOpen])

  useEffect(() => {
    registerBagAnchor(bagButtonRef.current)
    return () => registerBagAnchor(null)
  }, [registerBagAnchor])
  const onCollections = location.pathname.startsWith(ARKE_COLLECTIONS)
  const onFavorites = location.pathname === ARKE_FAVORITES
  const onAbout = location.pathname === ARKE_ABOUT
  const showingNewArrivals = onCollections && searchParams.get("tag") === "New"

  useEffect(() => {
    const favicon =
      document.querySelector<HTMLLinkElement>('link[rel="icon"]') ??
      (() => {
        const link = document.createElement("link")
        link.rel = "icon"
        document.head.appendChild(link)
        return link
      })()

    const previousFavicon = favicon.href
    const previousTitle = document.title

    favicon.type = "image/png"
    favicon.href = ARKE_FAVICON
    document.title = "ARKĒ — Clothing Store"

    return () => {
      favicon.href = previousFavicon || DEFAULT_FAVICON
      document.title = previousTitle || DEFAULT_TITLE
    }
  }, [])

  return (
    <div className="arke-store min-h-screen overflow-x-hidden bg-white font-sans text-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="arke-holo-bar h-0.5 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to={ARKE_BASE} className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <span className="arke-holo-text truncate text-xl font-black tracking-[0.2em] sm:text-2xl sm:tracking-[0.35em]">
              ARKĒ
            </span>
            <span className="hidden h-8 w-px bg-black/15 sm:block" />
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.45em] text-black/45 sm:block">
              Clothing Co.
            </span>
          </Link>

          <nav className="hidden gap-8 text-xs font-bold uppercase tracking-widest md:flex">
            <NavLink
              to={`${ARKE_COLLECTIONS}?tag=New`}
              className={() =>
                `cursor-pointer transition-colors hover:text-black ${
                  showingNewArrivals ? "text-black" : "text-black/50"
                }`
              }
            >
              New Arrivals
            </NavLink>
            <NavLink
              to={ARKE_COLLECTIONS}
              className={() =>
                `cursor-pointer transition-colors hover:text-black ${
                  onCollections && !showingNewArrivals ? "text-black" : "text-black/50"
                }`
              }
            >
              Collections
            </NavLink>
            <NavLink
              to={ARKE_ABOUT}
              className={() =>
                `cursor-pointer transition-colors hover:text-black ${
                  onAbout ? "text-black" : "text-black/50"
                }`
              }
            >
              About
            </NavLink>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Search products"
              aria-expanded={searchOpen}
              onClick={() => (searchOpen ? closeSearch() : openSearch())}
              className={`flex h-10 w-10 items-center justify-center border-2 border-black transition-colors ${
                searchOpen ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
              }`}
            >
              <MagnifyingGlass size={18} weight="bold" />
            </button>
            <Link
              to={ARKE_FAVORITES}
              aria-label="View favorites"
              aria-current={onFavorites ? "page" : undefined}
              className={`relative flex h-10 w-10 items-center justify-center border-2 border-black transition-colors ${
                onFavorites
                  ? "bg-black text-white"
                  : "bg-white hover:bg-black hover:text-white"
              }`}
            >
              <motion.span
                key={favoritePulse}
                initial={{ scale: 1 }}
                animate={favoritePulse > 0 ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center"
              >
                <Heart size={18} weight={favoriteCount > 0 ? "fill" : "bold"} />
              </motion.span>
              {favoriteCount > 0 && (
                <motion.span
                  key={favoriteCount}
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-black text-[10px] font-black text-white ring-2 ring-white"
                >
                  {favoriteCount}
                </motion.span>
              )}
            </Link>
            <button
              ref={bagButtonRef}
              type="button"
              aria-label="Open shopping bag"
              aria-expanded={cartOpen}
              onClick={() => {
                closeSearch()
                setCartOpen(!cartOpen)
              }}
              className="relative flex h-11 min-w-11 shrink-0 items-center justify-center gap-2 border-2 border-black bg-black px-3 text-sm font-bold uppercase tracking-wider text-white sm:px-4"
            >
              <motion.span
                key={bagPulse}
                initial={{ scale: 1 }}
                animate={bagPulse > 0 ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag size={18} weight="bold" />
                <span className="hidden sm:inline">Bag</span>
              </motion.span>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 1.35 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center bg-white text-[10px] font-black text-black ring-2 ring-black"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
          </div>
        </div>
      </header>

      <ArkeSearchPanel
        open={searchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={closeSearch}
      />

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
                            modelImage={p.modelImage}
                            className="!h-full !min-h-0"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold">{p.name}</p>
                          <p className="text-sm text-black/50">{formatArkePrice(p.price)}</p>
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
                  <span>{formatArkePrice(cartTotal)}</span>
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

      <Outlet />

      <footer className="border-t-2 border-black bg-black px-6 py-10 text-center">
        <p className="arke-holo-text-light text-lg font-black tracking-[0.35em]">ARKĒ</p>
        <p className="mt-2 text-sm text-white/40">Modern Clothing · Est. 2026</p>
        <p className="mt-1 text-xs text-white/30">Customer care: hello@arke-clothing.com</p>
        <p className="mx-auto mt-4 max-w-md text-[10px] leading-relaxed text-white/25">
          Demo storefront — some product and model images are placeholders for portfolio
          presentation only.
        </p>
        <a
          href="/"
          className="mt-6 inline-block text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white"
        >
          ← Back to Portfolio
        </a>
      </footer>

      <ArkeHoloStyles />
    </div>
  )
}
