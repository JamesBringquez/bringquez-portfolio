import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { products } from "./arkeData"

const STORAGE_KEY = "arke-favorites"

function loadFavorites(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === "number") : []
  } catch {
    return []
  }
}

type FavoritesContextValue = {
  favorites: number[]
  favoriteCount: number
  favoritePulse: number
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
  favoriteProducts: typeof products
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function ArkeFavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(loadFavorites)
  const [favoritePulse, setFavoritePulse] = useState(0)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      if (!prev.includes(id)) setFavoritePulse((n) => n + 1)
      return next
    })
  }, [])

  const favoriteProducts = useMemo(
    () => products.filter((p) => favorites.includes(p.id)),
    [favorites],
  )

  const value = useMemo(
    () => ({
      favorites,
      favoriteCount: favorites.length,
      favoritePulse,
      isFavorite,
      toggleFavorite,
      favoriteProducts,
    }),
    [favorites, favoritePulse, isFavorite, toggleFavorite, favoriteProducts],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useArkeFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error("useArkeFavorites must be used within ArkeFavoritesProvider")
  return ctx
}
