import { Link } from 'react-router-dom'

export const WatchlistEmptyState = () => (
  <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-zinc-700">
    <p className="text-lg font-medium text-slate-900 dark:text-white">
      Your watchlist is empty
    </p>
    <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">
      Browse movies and TV shows, then tap the bookmark icon to save them here.
    </p>
    <Link
      to="/"
      className="mt-6 inline-block rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
    >
      Browse Home
    </Link>
  </div>
)