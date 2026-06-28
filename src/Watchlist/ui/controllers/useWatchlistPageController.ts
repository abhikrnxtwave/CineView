import { useMemo, useState } from 'react'
import type { WatchlistFilter, WatchlistSortBy } from '../../core/types/Watchlist.types'
import { useWatchlist } from '../../data/hooks/useWatchlist'

export const useWatchlistPageController = () => {
  const {
    entries,
    countByStatus,
    updateStatus,
    updateNote,
    remove,
  } = useWatchlist()

  const [activeFilter, setActiveFilter] = useState<WatchlistFilter>('all')
  const [sortBy, setSortBy] = useState<WatchlistSortBy>('date_added')

  const filteredEntries = useMemo(() => {
    const filtered =
      activeFilter === 'all'
        ? entries
        : entries.filter((entry) => entry.status === activeFilter)

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.snapshot.voteAverage - a.snapshot.voteAverage
        case 'title':
          return a.snapshot.title.localeCompare(b.snapshot.title)
        case 'date_added':
        default:
          return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime()
      }
    })
  }, [entries, activeFilter, sortBy])

  return {
    activeFilter,
    sortBy,
    countByStatus,
    filteredEntries,
    setActiveFilter,
    setSortBy,
    updateStatus,
    updateNote,
    remove,
  }
}