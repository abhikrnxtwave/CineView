import { describe, it, expect, beforeEach } from 'vitest'
import { SessionService } from './index'
import { SESSION_STORAGE_KEY } from '../../../core/constants/Auth.constants'

describe('SessionService', () => {
  const service = new SessionService()

  beforeEach(() => {
    sessionStorage.clear()
  })

  it('verifies valid credentials', () => {
    expect(service.verifyCredentials('admin', 'admin@123')).toBe(true)
  })

  it('rejects invalid credentials', () => {
    expect(service.verifyCredentials('admin', 'wrong')).toBe(false)
  })

  it('persists and clears session', () => {
    service.setSession('admin')
    expect(service.isAuthenticated()).toBe(true)
    expect(service.getSession()?.username).toBe('admin')

    service.clearSession()
    expect(service.isAuthenticated()).toBe(false)
    expect(sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeNull()
  })
})