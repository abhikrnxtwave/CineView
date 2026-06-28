import { useMemo, useState } from 'react'
import type { WatchlistFilter, WatchlistSortBy } from '../../core/types/Collection.types'
import { useCollection } from '../../data/hooks/useCollection'

export const useWatchlistPageController = () => {
  const {
    watchlist,
    countByStatus,
    updateWatchlistStatus,
    updateWatchlistNote,
    clearWatchlistNote,
    removeFromWatchlist,
  } = useCollection()

  const [activeFilter, setActiveFilter] = useState<WatchlistFilter>('all')
  const [sortBy, setSortBy] = useState<WatchlistSortBy>('date_added')

  const filteredEntries = useMemo(() => {
    const filtered =
      activeFilter === 'all'
        ? watchlist
        : watchlist.filter((entry) => entry.status === activeFilter)

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
  }, [watchlist, activeFilter, sortBy])

  return {
    activeFilter,
    sortBy,
    countByStatus,
    filteredEntries,
    setActiveFilter,
    setSortBy,
    updateStatus: updateWatchlistStatus,
    updateNote: updateWatchlistNote,
    clearNote: clearWatchlistNote,
    remove: removeFromWatchlist,
  }
}