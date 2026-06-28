import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { preferencesStore } from './PreferencesStore'

const PreferencesContext = createContext(preferencesStore)

type Props = { children: ReactNode }

export const PreferencesProvider = ({ children }: Props) => {
  useEffect(() => {
    preferencesStore.hydrate()
  }, [])

  return (
    <PreferencesContext.Provider value={preferencesStore}>
      {children}
    </PreferencesContext.Provider>
  )
}

export const usePreferencesStore = () => useContext(PreferencesContext)