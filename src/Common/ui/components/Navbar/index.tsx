import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { recentSearchService } from '../../../data/services/RecentSearchService'
import { Logo } from '../Logo'
import { Button } from '../Button'
import {
  CloseIcon,
  MenuIcon,
  NAV_ITEMS,
  SearchIcon,
} from './NavIcons.tsx'

import { DEBOUNCE_MS } from '../../../core/constants/Tmdb.constants'

type NavbarProps = {
  userDisplayName: string
  onLogout: () => void
  watchlistCount?: number
}

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-violet-600/20 text-violet-600 shadow-sm shadow-violet-600/10 dark:text-violet-300'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-white'
  }`

const tabletLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition ${
    isActive
      ? 'bg-violet-600/20 text-violet-600 dark:text-violet-300'
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-zinc-800/80 dark:hover:text-white'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
    isActive
      ? 'bg-violet-600/15 text-violet-600 dark:text-violet-300'
      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white'
  }`

const WatchlistBadge = ({ count }: { count: number }) =>
  count > 0 ? (
    <span className="ml-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-violet-600 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
      {count > 99 ? '99+' : count}
    </span>
  ) : null

const renderNavLabel = (to: string, label: string, watchlistCount = 0) =>
  to === '/watchlist' ? (
    <span className="inline-flex items-center">
      {label}
      <WatchlistBadge count={watchlistCount} />
    </span>
  ) : (
    label
  )

export const Navbar = ({
  userDisplayName,
  onLogout,
  watchlistCount = 0,
}: NavbarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    recentSearchService.get(),
  )

  const initials = userDisplayName
    .split(' ')
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2)

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
    setIsSearchFocused(false)
  }

  const runSearch = (query: string) => {
    const trimmed = query.trim()
    if (!trimmed) {
      if (location.pathname === '/search') {
        navigate('/', { replace: true })
      }
      return
    }

    recentSearchService.add(trimmed)
    setRecentSearches(recentSearchService.get())
    setSearchQuery(trimmed)
    setIsSearchFocused(false)
    closeAllMenus()
    navigate(`/search?q=${encodeURIComponent(trimmed)}`, { replace: true })
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    runSearch(searchQuery)
  }

  const handleRecentSelect = (query: string) => {
    setSearchQuery(query)
    runSearch(query)
  }

  useEffect(() => {
    closeAllMenus()
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/search') return
    const q = new URLSearchParams(location.search).get('q') ?? ''
    setSearchQuery(q)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (location.pathname !== '/search') {
      setSearchQuery('')
    }
  }, [location.pathname])

  useEffect(() => {
    const trimmed = searchQuery.trim()

    const timer = setTimeout(() => {
      if (!trimmed) {
        if (location.pathname === '/search') {
          navigate('/', { replace: true })
        }
        return
      }

      const currentQ = new URLSearchParams(location.search).get('q') ?? ''
      if (location.pathname === '/search' && currentQ === trimmed) return

      navigate(`/search?q=${encodeURIComponent(trimmed)}`, { replace: true })
    }, DEBOUNCE_MS)

    return () => clearTimeout(timer)
  }, [searchQuery, navigate, location.pathname, location.search])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const renderRecentDropdown = () =>
    isSearchFocused && recentSearches.length > 0 ? (
      <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
        <p className="border-b border-slate-200 px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:border-zinc-800 dark:text-zinc-500">
          Recent searches
        </p>
        <ul>
          {recentSearches.map((item) => (
            <li key={item}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleRecentSelect(item)}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                <SearchIcon className="h-4 w-4 shrink-0 text-slate-400 dark:text-zinc-500" />
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    ) : null

  const renderSearchForm = (className = '') => (
    <form onSubmit={handleSearchSubmit} className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => {
          setRecentSearches(recentSearchService.get())
          setIsSearchFocused(true)
        }}
        onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
        placeholder="Search movies, shows, people..."
        className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-white dark:placeholder:text-zinc-500"
      />
      {renderRecentDropdown()}
    </form>
  )

  const mobileDrawer = isMenuOpen
    ? createPortal(
        <div className="fixed inset-0 z-[9999] md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm dark:bg-black/70"
            onClick={closeAllMenus}
            aria-hidden="true"
          />

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute right-0 top-0 flex h-full w-[min(85vw,300px)] flex-col bg-white shadow-2xl shadow-black/20 dark:bg-[#0a0a0a] dark:shadow-black/60"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200 px-4 py-4 dark:border-zinc-800">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-sm font-semibold text-white">
                  {initials || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                    {userDisplayName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-zinc-500">Signed in</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAllMenus}
                className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 text-slate-600 transition hover:bg-slate-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="shrink-0 border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
              {renderSearchForm()}
            </div>

            <nav
              className="flex-1 overflow-y-auto px-3 py-3"
              aria-label="Mobile navigation"
            >
              {NAV_ITEMS.map(({ to, label, end, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={mobileLinkClass}
                  onClick={closeAllMenus}
                >
                  <span className="text-violet-600 dark:text-violet-400">{icon}</span>
                  <span>{renderNavLabel(to, label, watchlistCount)}</span>
                </NavLink>
              ))}
            </nav>

            <div className="shrink-0 border-t border-slate-200 p-4 dark:border-zinc-800">
              <Button
                variant="ghost"
                onClick={() => {
                  closeAllMenus()
                  onLogout()
                }}
                className="w-full justify-center text-red-600 hover:bg-red-500/10 dark:text-red-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md dark:border-zinc-800/80 dark:bg-[#0a0a0a]/90">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">
          <div className="md:hidden">
            <Logo onClick={closeAllMenus} showText compact />
          </div>
          <div className="hidden md:block">
            <Logo onClick={closeAllMenus} showText />
          </div>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ to, label, end, icon }) => (
              <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
                {icon}
                <span>{renderNavLabel(to, label, watchlistCount)}</span>
              </NavLink>
            ))}
          </nav>

          <nav
            className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto md:flex lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={tabletLinkClass}>
                {renderNavLabel(to, label, watchlistCount)}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-1 lg:block" />

          <div className="relative hidden min-w-0 flex-1 md:block lg:max-w-sm">
            {renderSearchForm()}
          </div>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              disabled
              className="hidden h-10 items-center rounded-xl border border-slate-300 px-3 text-xs font-medium text-slate-500 lg:inline-flex dark:border-zinc-700/80 dark:text-zinc-400"
              title="Language switcher coming in Milestone 4"
            >
              EN
            </button>

            <div className="relative hidden md:block" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-2 transition hover:bg-slate-100 dark:border-zinc-700/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-800"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-xs font-semibold text-white">
                  {initials || 'U'}
                </div>
                <span className="hidden max-w-[88px] truncate text-sm text-slate-700 md:block lg:max-w-[100px] dark:text-zinc-300">
                  {userDisplayName}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-black/10 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40">
                  <div className="border-b border-slate-200 px-4 py-3 dark:border-zinc-800">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {userDisplayName}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-zinc-500">Signed in</p>
                  </div>
                  <div className="p-2">
                    <NavLink
                      to="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
                    >
                      Settings
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        onLogout()
                      }}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-500/10 dark:text-red-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700 transition hover:bg-slate-100 md:hidden dark:border-zinc-700/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </header>

      {mobileDrawer}
    </>
  )
}