import { useEffect, useState } from 'react'
import { tmdbService } from '../../../Common/data/services/TmdbService/index.api'
import type {
  CastMember,
  MovieDetail,
  MovieSummary,
  SectionStatus,
  Video,
} from '../../../Common/core/types/Tmdb.types'

export const useMovieDetailController = (movieId: number) => {
  const [movie, setMovie] = useState<MovieDetail | null>(null)
  const [movieStatus, setMovieStatus] = useState<SectionStatus>('loading')
  const [videos, setVideos] = useState<Video[]>([])
  const [cast, setCast] = useState<CastMember[]>([])
  const [similar, setSimilar] = useState<MovieSummary[]>([])
  const [recommended, setRecommended] = useState<MovieSummary[]>([])
  const [castStatus, setCastStatus] = useState<SectionStatus>('idle')
  const [similarStatus, setSimilarStatus] = useState<SectionStatus>('idle')
  const [recommendedStatus, setRecommendedStatus] = useState<SectionStatus>('idle')

  useEffect(() => {
    if (!movieId || Number.isNaN(movieId)) {
      setMovieStatus('error')
      return
    }

    const load = async () => {
      setMovieStatus('loading')
      try {
        const detail = await tmdbService.getMovieDetails(movieId)
        setMovie(detail)
        setMovieStatus('success')
      } catch {
        setMovie(null)
        setMovieStatus('error')
        return
      }

      setCastStatus('loading')
      setSimilarStatus('loading')
      setRecommendedStatus('loading')

      try {
        const [v, c, s, r] = await Promise.all([
          tmdbService.getMovieVideos(movieId),
          tmdbService.getMovieCredits(movieId),
          tmdbService.getSimilarMovies(movieId),
          tmdbService.getRecommendedMovies(movieId),
        ])
        setVideos(v)
        setCast(c)
        setSimilar(s)
        setRecommended(r)
        setCastStatus('success')
        setSimilarStatus('success')
        setRecommendedStatus('success')
      } catch {
        setCastStatus('error')
        setSimilarStatus('error')
        setRecommendedStatus('error')
      }
    }

    load()
  }, [movieId])

  const trailerKey =
    videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer')?.key ?? null

  return {
    movie,
    movieStatus,
    cast,
    castStatus,
    similar,
    similarStatus,
    recommended,
    recommendedStatus,
    trailerKey,
  }
}