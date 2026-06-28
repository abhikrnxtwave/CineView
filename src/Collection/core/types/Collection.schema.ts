import { z } from 'zod'

export const mediaTypeSchema = z.enum(['movie', 'tv'])

export const watchlistStatusSchema = z.enum(['want_to_watch', 'watching', 'completed'])

export const mediaSnapshotSchema = z.object({
  title: z.string().min(1),
  posterPath: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value): string | null => value ?? null),
  voteAverage: z.number().min(0).max(10),
  totalEpisodes: z.number().int().min(0).optional(),
})

export const watchlistEntrySchema = z.object({
  id: z.string().uuid(),
  mediaType: mediaTypeSchema,
  mediaId: z.number().int().positive(),
  status: watchlistStatusSchema,
  note: z.string().max(300),
  snapshot: mediaSnapshotSchema,
  addedAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const listItemSchema = z.object({
  id: z.string().uuid(),
  mediaType: mediaTypeSchema,
  mediaId: z.number().int().positive(),
  snapshot: mediaSnapshotSchema,
  addedAt: z.string().min(1),
})

export const customListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(60),
  description: z.string().max(200).default(''),
  items: z.array(listItemSchema),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
})

export const watchedEpisodeSchema = z.object({
  showId: z.number().int().positive(),
  seasonNumber: z.number().int().min(0),
  episodeNumber: z.number().int().positive(),
  watchedAt: z.string().min(1),
})

export const collectionStorageSchema = z.object({
  version: z.literal(1),
  watchlist: z.array(watchlistEntrySchema),
  lists: z.array(customListSchema),
  watchedEpisodes: z.array(watchedEpisodeSchema),
})

export const addWatchlistInputSchema = z.object({
  mediaType: mediaTypeSchema,
  mediaId: z.number().int().positive(),
  snapshot: mediaSnapshotSchema,
})

export const updateNoteInputSchema = z.object({
  id: z.string().uuid(),
  note: z.string().max(300),
})

export const createListInputSchema = z.object({
  name: z.string().trim().min(1).max(60),
  description: z.string().max(200).default(''),
})

export const renameListInputSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(60),
})