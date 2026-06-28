import { WATCHLIST_SORT_OPTIONS } from '../../../core/constants/Collection.constants'
import type { WatchlistSortBy } from '../../../core/types/Collection.types'

type Props = {
  value: WatchlistSortBy
  onChange: (value: WatchlistSortBy) => void
}

export const WatchlistSortSelect = ({ value, onChange }: Props) => (
  <div className="flex items-center gap-2">
    <label htmlFor="watchlist-sort" className="text-sm text-slate-600 dark:text-zinc-400">
      Sort by
    </label>
    <select
      id="watchlist-sort"
      value={value}
      onChange={(e) => onChange(e.target.value as WatchlistSortBy)}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
    >
      {WATCHLIST_SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)