import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '../Logo'
import { Button } from '../Button'
import {
  CloseIcon,
  MenuIcon,
  NAV_ITEMS,
  SearchIcon,
} from './NavIcons.tsx'

type NavbarProps = {
  userDisplayName: string
  onLogout: () => void
}

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-violet-600/20 text-violet-300 shadow-sm shadow-violet-600/10'
      : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
  }`

const tabletLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition ${
    isActive
      ? 'bg-violet-600/20 text-violet-300'
      : 'text-zinc-400 hover:bg-zinc-800/80 hover:text-white'
  }`

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
    isActive
      ? 'bg-violet-600/15 text-violet-300'
      : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
  }`

export const Navbar = ({ userDisplayName, onLogout }: NavbarProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const menuRef = useRef<HTMLDivElement>(null)

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const initials = userDisplayName
    .split(' ')
    .map((part) => part[0]?.toUpperCase())
    .join('')
    .slice(0, 2)

  const closeAllMenus = () => {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
    setIsMobileSearchOpen(false)
  }

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    closeAllMenus()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate('/search')
    }
  }

  // Close menus on route change
  useEffect(() => {
    closeAllMenus()
  }, [location.pathname])

  // Lock body scroll when mobile menu or mobile search is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isMobileSearchOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen, isMobileSearchOpen])

  // Close user menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Mobile drawer rendered via portal so it escapes header stacking context
  const mobileDrawer = isMenuOpen
    ? createPortal(
        <div className="fixed inset-0 z-[9999] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeAllMenus}
            aria-hidden="true"
          />

          {/* Drawer panel — slides in from right */}
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="absolute right-0 top-0 flex h-full w-[min(85vw,300px)] flex-col bg-[#0a0a0a] shadow-2xl shadow-black/60"
          >
            {/* Drawer header — user info + close */}
            <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-sm font-semibold text-white">
                  {initials || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {userDisplayName}
                  </p>
                  <p className="text-xs text-zinc-500">Signed in</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeAllMenus}
                className="ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Search inside drawer */}
            <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
              <form onSubmit={handleSearchSubmit} className="relative">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies, shows..."
                  autoFocus
                  className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30"
                />
              </form>
            </div>

            {/* Nav links — scrollable */}
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
                  <span className="text-violet-400">{icon}</span>
                  <span>{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Logout footer */}
            <div className="shrink-0 border-t border-zinc-800 p-4">
              <Button
                variant="ghost"
                onClick={() => {
                  closeAllMenus()
                  onLogout()
                }}
                className="w-full justify-center text-red-300 hover:bg-red-500/10"
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
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 w-full max-w-[1600px] items-center gap-2 px-3 sm:h-16 sm:gap-3 sm:px-6 lg:px-8">

          {/* Logo — compact on mobile, full on md+ */}
          <div className="md:hidden">
            <Logo onClick={closeAllMenus} showText compact />
          </div>
          <div className="hidden md:block">
            <Logo onClick={closeAllMenus} showText />
          </div>

          {/* Desktop nav — lg+ */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ to, label, end, icon }) => (
              <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
                {icon}
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Tablet nav — md to lg */}
          <nav
            className="hidden min-w-0 flex-1 items-center gap-0.5 overflow-x-auto md:flex lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={tabletLinkClass}>
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden flex-1 lg:block" />

          {/* Desktop search — lg+ */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden w-full max-w-sm lg:block"
          >
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies, shows, people..."
              className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
            />
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">

            {/* Tablet search toggle — md to lg only */}
            <button
              type="button"
              onClick={() => {
                setIsMobileSearchOpen((prev) => !prev)
                setIsMenuOpen(false)
              }}
              className="hidden h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/80 text-zinc-300 transition hover:bg-zinc-800 md:inline-flex lg:hidden"
              aria-label="Toggle search"
            >
              <SearchIcon />
            </button>

            {/* Language — lg+ */}
            <button
              type="button"
              disabled
              className="hidden h-10 items-center rounded-xl border border-zinc-700/80 px-3 text-xs font-medium text-zinc-400 lg:inline-flex"
              title="Language switcher coming in Milestone 4"
            >
              EN
            </button>

            {/* User menu — md+ only (mobile uses drawer) */}
            <div className="relative hidden md:block" ref={menuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="flex h-10 items-center gap-2 rounded-xl border border-zinc-700/80 bg-zinc-900/50 px-2 transition hover:bg-zinc-800"
                aria-label="User menu"
                aria-expanded={isUserMenuOpen}
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-700 text-xs font-semibold text-white">
                  {initials || 'U'}
                </div>
                <span className="hidden max-w-[88px] truncate text-sm text-zinc-300 md:block lg:max-w-[100px]">
                  {userDisplayName}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/40">
                  <div className="border-b border-zinc-800 px-4 py-3">
                    <p className="text-sm font-medium text-white">{userDisplayName}</p>
                    <p className="text-xs text-zinc-500">Signed in</p>
                  </div>
                  <div className="p-2">
                    <NavLink
                      to="/settings"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Settings
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false)
                        onLogout()
                      }}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger — mobile only (<md) */}
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/80 text-zinc-300 transition hover:bg-zinc-800 md:hidden"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                setIsMenuOpen((prev) => !prev)
                setIsMobileSearchOpen(false)
              }}
            >
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Tablet search bar — md to lg only */}
        {isMobileSearchOpen && (
          <div className="border-t border-zinc-800 px-4 py-3 md:block lg:hidden">
            <form onSubmit={handleSearchSubmit} className="relative">
              <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows, people..."
                className="w-full rounded-xl border border-zinc-700/80 bg-zinc-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
              />
            </form>
          </div>
        )}
      </header>

      {/* Mobile drawer — portaled to document.body to escape header stacking context */}
      {mobileDrawer}
    </>
  )
}