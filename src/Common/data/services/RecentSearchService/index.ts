import { z } from 'zod'
import { RECENT_SEARCHES_KEY, RECENT_SEARCHES_LIMIT } from '../../../core/constants/Tmdb.constants'

const schema = z.array(z.string().trim().min(1)).max(RECENT_SEARCHES_LIMIT)

export const recentSearchService = {
  get(): string[] {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY)
      if (!raw) return []
      return schema.parse(JSON.parse(raw))
    } catch {
      return []
    }
  },

  add(query: string) {
    const trimmed = query.trim()
    if (!trimmed) return
    const next = [trimmed, ...this.get().filter((q) => q !== trimmed)].slice(
      0,
      RECENT_SEARCHES_LIMIT,
    )
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(schema.parse(next)))
  },

  clear() {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  },
}