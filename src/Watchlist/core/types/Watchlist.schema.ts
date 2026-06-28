import { z } from 'zod'

export const mediaTypeSchema = z.enum(['movie', 'tv'])

export const watchlistStatusSchema = z.enum(['want_to_watch', 'watching', 'completed'])

export const mediaSnapshotSchema = z.object({
  title: z.string().min(1),
  posterPath: z
    .union([z.string(), z.null(), z.undefined()])
    .transform((value): string | null => value ?? null),
  voteAverage: z.number().min(0).max(10),
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

export const watchlistStorageSchema = z.object({
  entries: z.array(watchlistEntrySchema),
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

// Use Zod output types (after transforms) as the source of truth
export type MediaSnapshot = z.output<typeof mediaSnapshotSchema>
export type WatchlistEntry = z.output<typeof watchlistEntrySchema>
export type AddWatchlistInput = z.output<typeof addWatchlistInputSchema>