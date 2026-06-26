import { AUTH_CREDENTIALS, SESSION_STORAGE_KEY } from '../../../core/constants/Auth.constants'
import type { Session } from '../../../core/types/Auth.types'

export class SessionService {
  getSession(): Session | null {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) return null

    try {
      const session = JSON.parse(raw) as Session
      if (!session.username || !session.loggedInAt) return null
      return session
    } catch {
      return null
    }
  }

  setSession(username: string): void {
    const session: Session = {
      username,
      loggedInAt: new Date().toISOString(),
    }
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  }

  clearSession(): void {
    sessionStorage.removeItem(SESSION_STORAGE_KEY)
  }

  isAuthenticated(): boolean {
    return this.getSession() !== null
  }

  verifyCredentials(username: string, password: string): boolean {
    return (
      username === AUTH_CREDENTIALS.username &&
      password === AUTH_CREDENTIALS.password
    )
  }
}

export const sessionService = new SessionService()