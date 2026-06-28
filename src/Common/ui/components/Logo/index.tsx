import { NavLink } from 'react-router-dom'

type LogoProps = {
  onClick?: () => void
  showText?: boolean
  compact?: boolean
}

export const Logo = ({ onClick, showText = true, compact = false }: LogoProps) => (
  <NavLink
    to="/"
    onClick={onClick}
    className="group flex shrink-0 items-center gap-2.5"
    aria-label="CineView home"
  >
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600/15 ring-1 ring-violet-500/30 transition group-hover:bg-violet-600/25 group-hover:ring-violet-500/50">
      <img
        src="/favicon.svg"
        alt=""
        className="h-10 w-10"
        aria-hidden="true"
      />
    </div>

    {showText && !compact && (
  <div className="flex flex-col leading-none">
    <span className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white">
      CineView
    </span>
    <span className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-widest text-violet-600/80 sm:block dark:text-violet-400/80">
      Discover
    </span>
  </div>
)}
{showText && compact && (
  <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
    CineView
  </span>
)}
  </NavLink>
)