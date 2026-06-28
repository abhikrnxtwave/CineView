import { useEffect, useState } from 'react'
import { tmdbService } from '../../../Common/data/services/TmdbService/index.api'
import type { SectionStatus, TvDetail } from '../../../Common/core/types/Tmdb.types'

export const useTVShowController = (showId: number) => {
  const [show, setShow] = useState<TvDetail | null>(null)
  const [status, setStatus] = useState<SectionStatus>('loading')

  useEffect(() => {
    if (!showId || Number.isNaN(showId)) {
      setStatus('error')
      return
    }

    const load = async () => {
      setStatus('loading')
      try {
        const data = await tmdbService.getTvDetails(showId)
        setShow(data)
        setStatus('success')
      } catch {
        setShow(null)
        setStatus('error')
      }
    }

    load()
  }, [showId])

  return { show, status }
}