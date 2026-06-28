import type {
    CastMember,
    Genre,
    MovieDetail,
    MovieSummary,
    SeasonDetail,
    TvDetail,
    Video,
  } from '../../../core/types/Tmdb.types'
  
  export interface TmdbService {
    getTrendingMovies(): Promise<MovieSummary[]>
    getPopularMovies(): Promise<MovieSummary[]>
    getTopRatedMovies(): Promise<MovieSummary[]>
    getUpcomingMovies(): Promise<MovieSummary[]>
    getMovieGenres(): Promise<Genre[]>
    discoverMoviesByGenre(genreId: number): Promise<MovieSummary[]>
    getMovieDetails(id: number): Promise<MovieDetail>
    getMovieVideos(id: number): Promise<Video[]>
    getMovieCredits(id: number): Promise<CastMember[]>
    getSimilarMovies(id: number): Promise<MovieSummary[]>
    getRecommendedMovies(id: number): Promise<MovieSummary[]>
    searchMulti(query: string): Promise<unknown[]>
    getTvDetails(id: number): Promise<TvDetail>
    getSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetail>
  }