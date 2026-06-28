import type { CollectionStorageV1 } from '../types/Collection.types'

const LEGACY_KEY = 'cineview_watchlist'

export const migrateLegacyWatchlist = (): CollectionStorageV1 | null => {
  try {
    const raw = localStorage.getItem(LEGACY_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.entries) return null
    localStorage.removeItem(LEGACY_KEY)
    return {
      version: 1,
      watchlist: parsed.entries,
      lists: [],
      watchedEpisodes: [],
    }
  } catch {
    return null
  }
}