import { useAuthContext } from '../providers'

export const useAuth = () => {
  const { session, isAuthenticated, logout } = useAuthContext()

  return {
    isAuthenticated,
    username: session?.username ?? null,
    logout,
  }
}