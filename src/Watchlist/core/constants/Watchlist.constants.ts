import type { WatchlistFilter, WatchlistSortBy, WatchlistStatus } from '../types/Watchlist.types'

export const WATCHLIST_STORAGE_KEY = 'cineview_watchlist'

export const WATCHLIST_NOTE_MAX_LENGTH = 300

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