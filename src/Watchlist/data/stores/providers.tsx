import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { watchlistStore } from './WatchlistStore'

const WatchlistContext = createContext(watchlistStore)

type Props = { children: ReactNode }

export const WatchlistProvider = ({ children }: Props) => {
  useEffect(() => {
    watchlistStore.hydrate()
  }, [])

  return (
    <WatchlistContext.Provider value={watchlistStore}>
      {children}
    </WatchlistContext.Provider>
  )
}

export const useWatchlistStore = () => useContext(WatchlistContext)