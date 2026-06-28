import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../../Common/ui/components/Button'
import { TextInput } from '../../../Common/ui/components/TextInput'
import { useLoginController } from '../controllers/useLoginController'
import { getPostLoginRedirect } from '../../core/utils/Redirect.utils'
import type { AuthRedirectState } from '../components/ProtectedRoute'

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { submitLogin } = useLoginController()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string
    password?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setFormError(null)
    setFieldErrors({})
    setIsSubmitting(true)

    const result = submitLogin(username, password)

    if (result.success === false) {
      setFieldErrors(result.fieldErrors ?? {})
      setFormError(result.error ?? null)
      setIsSubmitting(false)
      return
    }

    const from = getPostLoginRedirect(
      (location.state as AuthRedirectState | null)?.from,
    )
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-[#0a0a0a]">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            CineView
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextInput
            id="username"
            label="Username"
            value={username}
            onChange={setUsername}
            error={fieldErrors.username}
            autoComplete="username"
            placeholder="Enter your username"
          />

          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            error={fieldErrors.password}
            autoComplete="current-password"
            placeholder="Enter your password"
          />

          {formError && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-300">
              {formError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-1 w-full rounded-xl py-3 text-sm font-semibold"
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}