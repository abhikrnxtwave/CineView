const DEFAULT_REDIRECT = '/'

export const getFullPath = (pathname: string, search = '', hash = '') =>
  `${pathname}${search}${hash}`

export const sanitizeRedirectPath = (path: string | undefined): string => {
  if (!path || !path.startsWith('/') || path.startsWith('//')) {
    return DEFAULT_REDIRECT
  }

  // Never redirect back to login after successful auth
  if (path === '/login' || path.startsWith('/login?')) {
    return DEFAULT_REDIRECT
  }

  return path
}

export const getPostLoginRedirect = (from: string | undefined): string =>
  sanitizeRedirectPath(from)