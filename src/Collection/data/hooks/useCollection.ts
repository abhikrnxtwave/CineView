import { useCollectionStore } from '../stores/providers'

export const useCollection = () => {
  const store = useCollectionStore()

  return {
    // watchlist
    watchlist: store.watchlist,
    totalCount: store.totalCount,
    countByStatus: store.countByStatus,
    isHydrated: store.isHydrated,
    isInWatchlist: store.isInWatchlist.bind(store),
    getWatchlistEntry: store.getWatchlistEntry.bind(store),
    toggleWatchlist: store.toggleWatchlist.bind(store),
    removeFromWatchlist: store.removeFromWatchlist.bind(store),
    updateWatchlistStatus: store.updateWatchlistStatus.bind(store),
    updateWatchlistNote: store.updateWatchlistNote.bind(store),
    clearWatchlistNote: store.clearWatchlistNote.bind(store),

    // lists
    lists: store.lists,
    getList: store.getList.bind(store),
    isInList: store.isInList.bind(store),
    getListsContaining: store.getListsContaining.bind(store),
    createList: store.createList.bind(store),
    renameList: store.renameList.bind(store),
    deleteList: store.deleteList.bind(store),
    toggleListItem: store.toggleListItem.bind(store),
    removeFromList: store.removeFromList.bind(store),

    // episodes
    isEpisodeWatched: store.isEpisodeWatched.bind(store),
    toggleEpisode: store.toggleEpisode.bind(store),
    markSeason: store.markSeason.bind(store),
    unmarkSeason: store.unmarkSeason.bind(store),
    getSeasonProgress: store.getSeasonProgress.bind(store),
    getShowProgress: store.getShowProgress.bind(store),
  }
}