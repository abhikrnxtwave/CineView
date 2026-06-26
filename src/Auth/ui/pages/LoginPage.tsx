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
    <div className="flex min-h-screen w-full bg-[#0a0a0a]">
      {/* Left panel — branding, hidden on mobile */}
      <div className="relative hidden flex-1 overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-[#0a0a0a] to-black" />
        <div className="absolute inset-0 bg-[url('/cinema-bg.jpg')] bg-cover bg-center opacity-20" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative z-10 flex flex-col justify-between px-16 py-16">
          {/* Top: wordmark */}
          <span className="text-sm font-semibold tracking-widest text-violet-400 uppercase">
            CineView
          </span>

          {/* Middle: hero copy */}
          <div>
            <h1 className="text-left text-5xl font-bold tracking-tight text-white leading-tight">
              Your movies,<br />your world.
            </h1>
            <p className="mt-4 max-w-md text-left text-lg text-zinc-400 leading-relaxed">
              Discover films and shows, track your watchlist, and never lose
              your place again.
            </p>

            {/* Social proof strip */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['V', 'A', 'M'].map((initial) => (
                  <div
                    key={initial}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0a0a0a] bg-violet-800 text-xs font-semibold text-white"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                Join <span className="text-zinc-300 font-medium">2,400+</span> users tracking their watchlist
              </p>
            </div>
          </div>

          {/* Bottom: fine print */}
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} CineView. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[480px] lg:shrink-0 lg:px-16 xl:w-[520px]">
        <div className="mx-auto w-full max-w-sm">

          {/* Mobile-only wordmark */}
          <div className="mb-10 lg:hidden">
            <h1 className="text-left text-3xl font-bold text-white">CineView</h1>
          </div>

          <div className="mb-8">
            <h2 className="text-left text-2xl font-semibold text-white">
              Sign In
            </h2>
            <p className="mt-2 text-left text-sm text-zinc-400">
              Enter your credentials to continue
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
              <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/8 px-4 py-3">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
                <p className="text-sm text-red-300">{formError}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-label="Sign In"
              className="mt-1 w-full rounded-xl bg-violet-600 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 active:bg-violet-700 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span aria-hidden="true" className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}