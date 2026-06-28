import { useCallback, useEffect, useState } from 'react'
import { tmdbService } from '../../../Common/data/services/TmdbService/index.api'
import type { Genre, MovieSummary, SectionStatus } from '../../../Common/core/types/Tmdb.types'
import type { Video } from '../../../Common/core/types/Tmdb.types'

type RowState = { items: MovieSummary[]; status: SectionStatus }

const emptyRow = (): RowState => ({ items: [], status: 'idle' })

export const useHomeController = () => {
  const [heroMovie, setHeroMovie] = useState<MovieSummary | null>(null)
  const [heroStatus, setHeroStatus] = useState<SectionStatus>('idle')
  const [genres, setGenres] = useState<Genre[]>([])
  const [genreStatus, setGenreStatus] = useState<SectionStatus>('idle')
  const [activeGenreId, setActiveGenreId] = useState<number | null>(null)

  const [trending, setTrending] = useState<RowState>(emptyRow)
  const [popular, setPopular] = useState<RowState>(emptyRow)
  const [topRated, setTopRated] = useState<RowState>(emptyRow)
  const [upcoming, setUpcoming] = useState<RowState>(emptyRow)
  const [filtered, setFiltered] = useState<RowState>(emptyRow)

  const loadRow = async (
    fetcher: () => Promise<MovieSummary[]>,
    setter: (v: RowState) => void,
  ) => {
    setter({ items: [], status: 'loading' })
    try {
      const items = await fetcher()
      setter({ items, status: 'success' })
    } catch {
      setter({ items: [], status: 'error' })
    }
  }

  useEffect(() => {
    const init = async () => {
      setHeroStatus('loading')
      setGenreStatus('loading')
      try {
        const [trendingData, genreData] = await Promise.all([
          tmdbService.getTrendingMovies(),
          tmdbService.getMovieGenres(),
        ])
        setHeroMovie(trendingData[0] ?? null)
        setHeroStatus('success')
        setGenres(genreData)
        setGenreStatus('success')
      } catch {
        setHeroStatus('error')
        setGenreStatus('error')
      }

      loadRow(() => tmdbService.getTrendingMovies(), setTrending)
      loadRow(() => tmdbService.getPopularMovies(), setPopular)
      loadRow(() => tmdbService.getTopRatedMovies(), setTopRated)
      loadRow(() => tmdbService.getUpcomingMovies(), setUpcoming)
    }
    init()
  }, [])

  useEffect(() => {
    if (activeGenreId === null) {
      setFiltered(emptyRow())
      return
    }
    loadRow(() => tmdbService.discoverMoviesByGenre(activeGenreId), setFiltered)
  }, [activeGenreId])

  const playHeroTrailer = useCallback(async () => {
    if (!heroMovie) return null
    const videos = await tmdbService.getMovieVideos(heroMovie.id)
    const trailer = videos.find((v: Video) => v.site === 'YouTube' && v.type === 'Trailer')
    return trailer?.key ?? null
  }, [heroMovie])

  return {
    heroMovie,
    heroStatus,
    genres,
    genreStatus,
    activeGenreId,
    setActiveGenreId,
    trending,
    popular,
    topRated,
    upcoming,
    filtered,
    playHeroTrailer,
  }
}