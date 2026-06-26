import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../data/hooks/useAuth'
import { getFullPath } from '../../core/utils/Redirect.utils'
import { sessionService } from '../../data/services/SessionService'

type ProtectedRouteProps = {
  children: ReactNode
}

export type AuthRedirectState = {
  from?: string
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  const isAuthed = isAuthenticated || sessionService.isAuthenticated()

  if (!isAuthed) {
    const from = getFullPath(location.pathname, location.search, location.hash)

    return (
      <Navigate
        to="/login"
        replace
        state={{ from } satisfies AuthRedirectState}
      />
    )
  }

  return <>{children}</>
}