import { useEffect, useMemo, useState } from 'react'
import { tmdbService } from '../../../Common/data/services/TmdbService/index.api'
import { recentSearchService } from '../../../Common/data/services/RecentSearchService'
import type { SectionStatus } from '../../../Common/core/types/Tmdb.types'

export const useSearchController = (query: string) => {
  const [status, setStatus] = useState<SectionStatus>('idle')
  const [results, setResults] = useState<unknown[]>([])

  useEffect(() => {
    const trimmed = query.trim()

    if (!trimmed) {
      setStatus('idle')
      setResults([])
      return
    }

    let cancelled = false

    const search = async () => {
      setStatus('loading')
      try {
        const data = await tmdbService.searchMulti(trimmed)
        if (cancelled) return
        setResults(data)
        setStatus('success')
        recentSearchService.add(trimmed)
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    search()

    return () => {
      cancelled = true
    }
  }, [query])

  const grouped = useMemo(
    () => ({
      movies: results.filter((r) => (r as { media_type: string }).media_type === 'movie'),
      tv: results.filter((r) => (r as { media_type: string }).media_type === 'tv'),
      people: results.filter((r) => (r as { media_type: string }).media_type === 'person'),
    }),
    [results],
  )

  return { status, grouped }
}