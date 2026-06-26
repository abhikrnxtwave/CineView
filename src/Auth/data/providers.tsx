import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '../core/types/Auth.types'
import { sessionService } from './services/SessionService'

type AuthContextValue = {
  session: Session | null
  isAuthenticated: boolean
  login: (username: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [session, setSession] = useState<Session | null>(() => sessionService.getSession())

  const login = useCallback((username: string) => {
    sessionService.setSession(username)
    setSession(sessionService.getSession())
  }, [])

  const logout = useCallback(() => {
    sessionService.clearSession()
    setSession(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      isAuthenticated: session !== null,
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}