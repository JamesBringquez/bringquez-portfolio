import { useCallback, useEffect, useRef, useState } from "react"
import { Link, NavLink, Outlet, useLocation, useSearchParams } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import {
  ShoppingBag,
  MagnifyingGlass,
  Plus,
  Minus,
  Heart,
  List,
  X,
  Truck,
} from "@phosphor-icons/react"
import ArkeProductImage from "../ArkeProductImage"
import { useArkeCart } from "./ArkeCartContext"
import { useArkeFavorites } from "./ArkeFavoritesContext"
import ArkeSearchPanel from "./ArkeSearchPanel"
import ArkeHoloStyles from "./ArkeHoloStyles"
import {
  ARKE_BASE,
  ARKE_ABOUT,
  ARKE_CHECKOUT,
  ARKE_COLLECTIONS,
  ARKE_FAVORITES,
  ARKE_FAVICON,
  DEFAULT_FAVICON,
  DEFAULT_TITLE,
  products,
} from "./arkeData"
import { ARKE_FREE_SHIPPING_MIN, formatArkePrice } from "./arkeUtils"

export default function ArkeStoreLayout() {
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const {
    lines,
    cartOpen,
    setCartOpen,
    cartCount,
    cartTotal,
    adjustQty,
    bagPulse,
    registerBagAnchor,
  } = useArkeCart()
  const { favoriteCount, favoritePulse } = useArkeFavorites()
  const bagButtonRef = useRef<HTMLButtonElement>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const openSearch = useCallback(() => {
    setCartOpen(false)
    setMobileNavOpen(false)
    setSearchOpen(true)
  }, [setCartOpen])

  const closeSearch = useCallback(() => {
    setSearchOpen(false)
    setSearchQuery("")
  }, [])

  useEffect(() => {
    setMobileNavOpen(false)
    setCartOpen(false)
    closeSearch()
  }, [location.pathname, location.search, setCartOpen, closeSearch])

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
          setMobileNavOpen(false)
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
  const onCheckout = location.pathname === ARKE_CHECKOUT
  const showingNewArrivals = onCollections && searchParams.get("tag") === "New"
  const shippingProgress = Math.min(100, (cartTotal / ARKE_FREE_SHIPPING_MIN) * 100)
  const remainingForShipping = Math.max(0, ARKE_FREE_SHIPPING_MIN - cartTotal)

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

  const navLinkClass = (active: boolean) =>
    `cursor-pointer transition-colors hover:text-black ${active ? "text-black" : "text-black/50"}`

  return (
    <div className="arke-store min-h-screen overflow-x-hidden bg-white font-sans text-[#0a0a0a]">
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/95 backdrop-blur-md">
        <div className="arke-holo-bar h-0.5 w-full" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2">
            <button
              type="button"
              aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileNavOpen}
              onClick={() => {
                closeSearch()
                setCartOpen(false)
                setMobileNavOpen((open) => !open)
              }}
              className="flex h-10 w-10 items-center justify-center border-2 border-black md:hidden"
            >
              {mobileNavOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
            </button>
            <Link to={ARKE_BASE} className="group flex min-w-0 items-center gap-2 sm:gap-3">
              <span className="arke-holo-text truncate text-xl font-black tracking-[0.2em] sm:text-2xl sm:tracking-[0.35em]">
                ARKĒ
              </span>
              <span className="hidden h-8 w-px bg-black/15 sm:block" />
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.45em] text-black/45 sm:block">
                Clothing Co.
              </span>
            </Link>
          </div>

          <nav className="hidden gap-8 text-xs font-bold uppercase tracking-widest md:flex">
            <NavLink
              to={`${ARKE_COLLECTIONS}?tag=New`}
              className={() => navLinkClass(showingNewArrivals)}
            >
              New Arrivals
            </NavLink>
            <NavLink
              to={ARKE_COLLECTIONS}
              className={() => navLinkClass(onCollections && !showingNewArrivals)}
            >
              Collections
            </NavLink>
            <NavLink to={ARKE_ABOUT} className={() => navLinkClass(onAbout)}>
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
                onFavorites ? "bg-black text-white" : "bg-white hover:bg-black hover:text-white"
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
                setMobileNavOpen(false)
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

        <AnimatePresence>
          {mobileNavOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-black/10 md:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3 text-sm font-black uppercase tracking-widest">
                <Link
                  to={`${ARKE_COLLECTIONS}?tag=New`}
                  className="px-3 py-3 hover:bg-black hover:text-white"
                >
                  New Arrivals
                </Link>
                <Link to={ARKE_COLLECTIONS} className="px-3 py-3 hover:bg-black hover:text-white">
                  Collections
                </Link>
                <Link to={ARKE_ABOUT} className="px-3 py-3 hover:bg-black hover:text-white">
                  About
                </Link>
                <Link to={ARKE_FAVORITES} className="px-3 py-3 hover:bg-black hover:text-white">
                  Favorites
                </Link>
                <button
                  type="button"
                  onClick={openSearch}
                  className="px-3 py-3 text-left hover:bg-black hover:text-white"
                >
                  Search
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <ArkeSearchPanel
        open={searchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={closeSearch}
      />

      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.button
              type="button"
              aria-label="Close cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setCartOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.32, 0.08, 0.24, 1] }}
              className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="border-b-2 border-black bg-black px-6 py-5 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-widest">Your Bag</h2>
                    <p className="text-sm text-white/60">
                      {cartCount} {cartCount === 1 ? "item" : "items"}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Close bag"
                    onClick={() => setCartOpen(false)}
                    className="flex h-9 w-9 items-center justify-center border border-white/30 hover:bg-white hover:text-black"
                  >
                    <X size={16} weight="bold" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-4">
                {cartCount === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center">
                    <ShoppingBag size={40} weight="regular" className="text-black/20" />
                    <p className="mt-4 text-lg font-black text-black">Your bag is empty</p>
                    <p className="mt-2 max-w-xs text-sm text-black/45">
                      Browse the collection and add a piece — you can choose your size before it
                      lands in the bag.
                    </p>
                    <Link
                      to={ARKE_COLLECTIONS}
                      onClick={() => setCartOpen(false)}
                      className="mt-6 border-2 border-black bg-black px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-white hover:text-black"
                    >
                      Start shopping
                    </Link>
                  </div>
                ) : (
                  <ul className="space-y-4">
                    {lines.map((line) => {
                      const p = products.find((product) => product.id === line.productId)
                      if (!p) return null
                      return (
                        <li
                          key={line.key}
                          className="flex items-center gap-3 border-b border-black/10 pb-4"
                        >
                          <Link
                            to={`${ARKE_COLLECTIONS}/${p.slug}`}
                            onClick={() => setCartOpen(false)}
                            className="h-16 w-12 shrink-0 overflow-hidden border border-black/10"
                          >
                            <ArkeProductImage
                              name={p.name}
                              visual={p.visual}
                              image={p.image}
                              modelImage={p.modelImage}
                              className="!h-full !min-h-0"
                            />
                          </Link>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold">{p.name}</p>
                            <p className="text-xs font-semibold uppercase tracking-wider text-black/40">
                              Size {line.size}
                            </p>
                            <p className="mt-1 text-sm text-black/50">
                              {formatArkePrice(p.price)}
                            </p>
                          </div>
                          <div className="flex shrink-0 items-center gap-2">
                            <button
                              type="button"
                              onClick={() => adjustQty(line.key, -1)}
                              className="flex h-8 w-8 items-center justify-center border-2 border-black"
                              aria-label={`Decrease ${p.name}`}
                            >
                              <Minus size={14} weight="bold" />
                            </button>
                            <span className="w-6 text-center text-sm font-black">{line.qty}</span>
                            <button
                              type="button"
                              onClick={() => adjustQty(line.key, 1)}
                              className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black text-white"
                              aria-label={`Increase ${p.name}`}
                            >
                              <Plus size={14} weight="bold" />
                            </button>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>

              {cartCount > 0 && (
                <div className="border-t-2 border-black p-6">
                  <div className="mb-4 rounded-sm border border-black/10 bg-[#fafafa] px-3 py-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/50">
                      <Truck size={14} weight="bold" className="text-black" />
                      {remainingForShipping > 0
                        ? `${formatArkePrice(remainingForShipping)} to free shipping`
                        : "Free shipping unlocked"}
                    </div>
                    <div className="h-1.5 overflow-hidden bg-black/10">
                      <div
                        className="h-full bg-black transition-all duration-500"
                        style={{ width: `${shippingProgress}%` }}
                      />
                    </div>
                  </div>
                  <div className="mb-4 flex justify-between text-lg font-black">
                    <span>Subtotal</span>
                    <span>{formatArkePrice(cartTotal)}</span>
                  </div>
                  <Link
                    to={ARKE_CHECKOUT}
                    onClick={() => setCartOpen(false)}
                    className="arke-holo-surface flex w-full items-center justify-center border-2 border-black py-3.5 text-sm font-black uppercase tracking-widest text-black"
                  >
                    Checkout
                  </Link>
                  {!onCheckout && (
                    <button
                      type="button"
                      onClick={() => setCartOpen(false)}
                      className="mt-3 w-full py-2 text-xs font-bold uppercase tracking-widest text-black/45 hover:text-black"
                    >
                      Continue shopping
                    </button>
                  )}
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <Outlet />

      <footer className="border-t-2 border-black bg-black px-6 py-10 text-center">
        <p className="arke-holo-text-light text-lg font-black tracking-[0.35em]">ARKĒ</p>
        <p className="mt-2 text-sm text-white/40">Modern Clothing · Est. 2026</p>
        <p className="mt-1 text-xs text-white/30">Customer care: hello@arke-clothing.com</p>
        <p className="mx-auto mt-4 max-w-md text-[10px] leading-relaxed text-white/25">
          Demo storefront for portfolio presentation — explore the full shopping flow; no real
          payment is processed.
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
