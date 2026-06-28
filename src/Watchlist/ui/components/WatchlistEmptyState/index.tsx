import { Link } from 'react-router-dom'

export const WatchlistEmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
    <p className="text-lg font-semibold text-slate-900 dark:text-white">
      Your watchlist is empty
    </p>
    <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-zinc-400">
      Browse movies and TV shows, then tap the + button on any card or detail page to save them here.
    </p>
    <Link
      to="/"
      className="mt-6 rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
    >
      Discover content
    </Link>
  </div>
)