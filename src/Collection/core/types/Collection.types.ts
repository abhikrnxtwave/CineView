import type { z } from 'zod'
import type {
  addWatchlistInputSchema,
  collectionStorageSchema,
  customListSchema,
  listItemSchema,
  mediaSnapshotSchema,
  mediaTypeSchema,
  watchlistEntrySchema,
  watchlistStatusSchema,
  watchedEpisodeSchema,
} from './Collection.schema'

export type MediaType = z.infer<typeof mediaTypeSchema>
export type WatchlistStatus = z.infer<typeof watchlistStatusSchema>
export type MediaSnapshot = z.output<typeof mediaSnapshotSchema>
export type WatchlistEntry = z.output<typeof watchlistEntrySchema>
export type AddWatchlistInput = z.output<typeof addWatchlistInputSchema>
export type ListItem = z.output<typeof listItemSchema>
export type CustomList = z.output<typeof customListSchema>
export type WatchedEpisode = z.output<typeof watchedEpisodeSchema>
export type CollectionStorageV1 = z.output<typeof collectionStorageSchema>

export type WatchlistFilter = 'all' | WatchlistStatus
export type WatchlistSortBy = 'date_added' | 'rating' | 'title'

export type StatusCounts = {
  all: number
  want_to_watch: number
  watching: number
  completed: number
}

export type ProgressStats = {
  watched: number
  total: number
  percent: number
}