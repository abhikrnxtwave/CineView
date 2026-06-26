import { describe, it, expect } from 'vitest'
import { loginFormSchema } from './Login.schema'

describe('loginFormSchema', () => {
  it('accepts valid input', () => {
    const result = loginFormSchema.safeParse({
      username: 'admin',
      password: 'admin123',
    })
    expect(result.success).toBe(true)
  })

  it('rejects empty fields', () => {
    const result = loginFormSchema.safeParse({ username: '', password: '' })
    expect(result.success).toBe(false)
  })
})