import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../../data/hooks/useAuth'
import { getPostLoginRedirect } from '../../core/utils/Redirect.utils'
import type { AuthRedirectState } from './ProtectedRoute'

type GuestOnlyRouteProps = {
  children: ReactNode
}

export const GuestOnlyRoute = ({ children }: GuestOnlyRouteProps) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (isAuthenticated) {
    const from = (location.state as AuthRedirectState | null)?.from
    return <Navigate to={getPostLoginRedirect(from)} replace />
  }

  return <>{children}</>
}