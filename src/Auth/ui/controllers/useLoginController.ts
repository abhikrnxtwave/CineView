import { loginFormSchema } from '../../core/types/Login.schema'
import { sessionService } from '../../data/services/SessionService'
import { useAuthContext } from '../../data/providers'

type FieldErrors = Partial<Record<'username' | 'password', string>>

type LoginResult =
  | { success: true }
  | { success: false; error?: string; fieldErrors?: FieldErrors }

export const useLoginController = () => {
  const { login } = useAuthContext()

  const submitLogin = (username: string, password: string): LoginResult => {
    const parsed = loginFormSchema.safeParse({ username, password })

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {}
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0]
        if (field === 'username' || field === 'password') {
          fieldErrors[field] = issue.message
        }
      })
      return { success: false, fieldErrors }
    }

    const isValid = sessionService.verifyCredentials(
      parsed.data.username,
      parsed.data.password,
    )

    if (!isValid) {
      return { success: false, error: 'Invalid username or password' }
    }

    login(parsed.data.username)
    return { success: true }
  }

  return { submitLogin }
}