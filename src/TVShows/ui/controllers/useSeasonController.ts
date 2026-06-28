import { useEffect, useState } from 'react'
import { tmdbService } from '../../../Common/data/services/TmdbService/index.api'
import type { SeasonDetail, SectionStatus } from '../../../Common/core/types/Tmdb.types'

export const useSeasonController = (showId: number, seasonNumber: number) => {
  const [season, setSeason] = useState<SeasonDetail | null>(null)
  const [status, setStatus] = useState<SectionStatus>('loading')

  useEffect(() => {
    if (!showId || Number.isNaN(showId) || !seasonNumber || Number.isNaN(seasonNumber)) {
      setStatus('error')
      return
    }

    const load = async () => {
      setStatus('loading')
      try {
        const data = await tmdbService.getSeasonDetails(showId, seasonNumber)
        setSeason(data)
        setStatus('success')
      } catch {
        setSeason(null)
        setStatus('error')
      }
    }
    load()
  }, [showId, seasonNumber])

  return { season, status }
}