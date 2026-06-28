import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { collectionStore } from './CollectionStore'

const CollectionContext = createContext(collectionStore)

type Props = { children: ReactNode }

export const CollectionProvider = ({ children }: Props) => {
  useEffect(() => {
    collectionStore.hydrate()
  }, [])

  return (
    <CollectionContext.Provider value={collectionStore}>
      {children}
    </CollectionContext.Provider>
  )
}

export const useCollectionStore = () => useContext(CollectionContext)