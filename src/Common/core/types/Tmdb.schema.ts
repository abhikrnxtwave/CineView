import { z } from 'zod'

export const genreSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const movieSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string().optional().default(''),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number().optional().default(0),
  release_date: z.string().optional().default(''),
  genre_ids: z.array(z.number()).optional(),
})

export const tvSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string().optional().default(''),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number().optional().default(0),
  first_air_date: z.string().optional().default(''),
})

export const paginatedMoviesSchema = z.object({
  page: z.number(),
  results: z.array(movieSummarySchema),
  total_pages: z.number(),
  total_results: z.number(),
})

export const genreListSchema = z.object({
  genres: z.array(genreSchema),
})

export const videoSchema = z.object({
  id: z.string(),
  key: z.string(),
  site: z.string(),
  type: z.string(),
  official: z.boolean().optional(),
})

export const videosResponseSchema = z.object({
  results: z.array(videoSchema),
})

export const castSchema = z.object({
  id: z.number(),
  name: z.string(),
  character: z.string().optional().default(''),
  profile_path: z.string().nullable(),
})

export const creditsSchema = z.object({
  cast: z.array(castSchema),
})

export const movieDetailSchema = movieSummarySchema.extend({
  runtime: z.number().nullable().optional(),
  genres: z.array(genreSchema).optional().default([]),
  tagline: z.string().optional().default(''),
  status: z.string().optional().default(''),
})

export const seasonSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  poster_path: z.string().nullable(),
  overview: z.string().optional().default(''),
})

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string().optional().default(''),
  air_date: z.string().optional().default(''),
  episode_number: z.number(),
  season_number: z.number(),
  still_path: z.string().nullable(),
  runtime: z.number().nullable().optional(),
})

export const seasonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episodes: z.array(episodeSchema),
})

export const tvDetailSchema = tvSummarySchema.extend({
  genres: z.array(genreSchema).optional().default([]),
  number_of_seasons: z.number().optional().default(0),
  seasons: z.array(seasonSummarySchema).optional().default([]),
  tagline: z.string().optional().default(''),
  status: z.string().optional().default(''),
})

export const searchPersonSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
  known_for_department: z.string().optional().default(''),
})

export const searchMultiResultSchema = z.discriminatedUnion('media_type', [
  movieSummarySchema.extend({ media_type: z.literal('movie') }),
  tvSummarySchema.extend({ media_type: z.literal('tv') }),
  searchPersonSchema.extend({ media_type: z.literal('person') }),
])

export const searchMultiResponseSchema = z.object({
  results: z.array(
    z.object({
      media_type: z.enum(['movie', 'tv', 'person']),
    }).passthrough(),
  ),
})

export type Genre = z.infer<typeof genreSchema>
export type MovieSummary = z.infer<typeof movieSummarySchema>
export type TvSummary = z.infer<typeof tvSummarySchema>
export type MovieDetail = z.infer<typeof movieDetailSchema>
export type TvDetail = z.infer<typeof tvDetailSchema>
export type Video = z.infer<typeof videoSchema>
export type CastMember = z.infer<typeof castSchema>
export type SeasonDetail = z.infer<typeof seasonDetailSchema>
export type Episode = z.infer<typeof episodeSchema>