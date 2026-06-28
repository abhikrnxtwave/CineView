export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL as string

export const TMDB_IMAGE_SIZES = {
  poster: 'w342',
  posterLarge: 'w500',
  backdrop: 'w1280',
  profile: 'w185',
} as const

export const DEBOUNCE_MS = 400
export const RECENT_SEARCHES_KEY = 'cineview_recent_searches'
export const RECENT_SEARCHES_LIMIT = 8