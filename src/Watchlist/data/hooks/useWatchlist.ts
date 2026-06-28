import { useWatchlistStore } from '../stores/providers'

export const useWatchlist = () => {
  const store = useWatchlistStore()

  return {
    entries: store.entries,
    totalCount: store.totalCount,
    countByStatus: store.countByStatus,
    isHydrated: store.isHydrated,
    isInWatchlist: store.isInWatchlist.bind(store),
    getEntry: store.getEntry.bind(store),
    add: store.add.bind(store),
    remove: store.remove.bind(store),
    toggle: store.toggle.bind(store),
    updateStatus: store.updateStatus.bind(store),
    updateNote: store.updateNote.bind(store),
  }
}