import type { WatchlistFilter, WatchlistSortBy, WatchlistStatus } from '../types/Collection.types'

export const COLLECTION_STORAGE_KEY = 'cineview_collection'
export const COLLECTION_VERSION = 1 as const

export const WATCHLIST_NOTE_MAX_LENGTH = 300
export const LIST_NAME_MAX_LENGTH = 60
export const LIST_DESCRIPTION_MAX_LENGTH = 200
export const NOTE_WARNING_THRESHOLD = 270

export const WATCHLIST_STATUSES: WatchlistStatus[] = [
  'want_to_watch',
  'watching',
  'completed',
]

export const WATCHLIST_STATUS_LABELS: Record<WatchlistStatus, string> = {
  want_to_watch: 'Want to Watch',
  watching: 'Watching',
  completed: 'Completed',
}

export const WATCHLIST_FILTER_LABELS: Record<WatchlistFilter, string> = {
  all: 'All',
  want_to_watch: 'Want to Watch',
  watching: 'Watching',
  completed: 'Completed',
}

export const WATCHLIST_SORT_OPTIONS: { value: WatchlistSortBy; label: string }[] = [
  { value: 'date_added', label: 'Date Added (newest)' },
  { value: 'rating', label: 'Rating (highest)' },
  { value: 'title', label: 'Title (A–Z)' },
]