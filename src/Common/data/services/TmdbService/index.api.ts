import { TMDB_API_KEY, TMDB_BASE_URL } from '../../../core/constants/Tmdb.constants'
import type { TmdbService } from './index'
import type { z } from 'zod'
import {
  creditsSchema,
  genreListSchema,
  movieDetailSchema,
  paginatedMoviesSchema,
  seasonDetailSchema,
  tvDetailSchema,
  videosResponseSchema,
} from '../../../core/types/Tmdb.schema'

const parse = <T>(schema: z.ZodType<T>, data: unknown): T => schema.parse(data)

export class TmdbAPI implements TmdbService {
  private async request<T>(
    path: string,
    params: Record<string, string> = {},
  ): Promise<T> {
    const url = new URL(`${TMDB_BASE_URL}${path}`)
    url.searchParams.set('api_key', TMDB_API_KEY)

    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.set(key, value),
    )

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`TMDB ${response.status}: ${path}`)
    }

    return response.json() as Promise<T>
  }

  async getTrendingMovies() {
    const data = await this.request<unknown>('/trending/movie/day')
    return parse(paginatedMoviesSchema, data).results
  }

  async getPopularMovies() {
    const data = await this.request<unknown>('/movie/popular')
    return parse(paginatedMoviesSchema, data).results
  }

  async getTopRatedMovies() {
    const data = await this.request<unknown>('/movie/top_rated')
    return parse(paginatedMoviesSchema, data).results
  }

  async getUpcomingMovies() {
    const data = await this.request<unknown>('/movie/upcoming')
    return parse(paginatedMoviesSchema, data).results
  }

  async getMovieGenres() {
    const data = await this.request<unknown>('/genre/movie/list')
    return parse(genreListSchema, data).genres
  }

  async discoverMoviesByGenre(genreId: number) {
    const data = await this.request<unknown>('/discover/movie', {
      with_genres: String(genreId),
    })

    return parse(paginatedMoviesSchema, data).results
  }

  async getMovieDetails(id: number) {
    const data = await this.request<unknown>(`/movie/${id}`)
    return parse(movieDetailSchema, data)
  }

  async getMovieVideos(id: number) {
    const data = await this.request<unknown>(`/movie/${id}/videos`)
    return parse(videosResponseSchema, data).results
  }

  async getMovieCredits(id: number) {
    const data = await this.request<unknown>(`/movie/${id}/credits`)
    return parse(creditsSchema, data).cast
  }

  async getSimilarMovies(id: number) {
    const data = await this.request<unknown>(`/movie/${id}/similar`)
    return parse(paginatedMoviesSchema, data).results
  }

  async getRecommendedMovies(id: number) {
    const data = await this.request<unknown>(`/movie/${id}/recommendations`)
    return parse(paginatedMoviesSchema, data).results
  }

  async searchMulti(query: string) {
    const data = await this.request<unknown>('/search/multi', { query })
    return (data as { results: unknown[] }).results ?? []
  }

  async getTvDetails(id: number) {
    const data = await this.request<unknown>(`/tv/${id}`)
    return parse(tvDetailSchema, data)
  }

  async getSeasonDetails(showId: number, seasonNumber: number) {
    const data = await this.request<unknown>(
      `/tv/${showId}/season/${seasonNumber}`,
    )

    return parse(seasonDetailSchema, data)
  }
}

export const tmdbService = new TmdbAPI()