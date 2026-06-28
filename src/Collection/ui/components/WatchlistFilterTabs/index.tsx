import type { StatusCounts, WatchlistFilter } from '../../../core/types/Collection.types'
import { WATCHLIST_FILTER_LABELS } from '../../../core/constants/Collection.constants'

type Props = {
  activeFilter: WatchlistFilter
  counts: StatusCounts
  onChange: (filter: WatchlistFilter) => void
}

const FILTERS: WatchlistFilter[] = ['all', 'want_to_watch', 'watching', 'completed']

export const WatchlistFilterTabs = ({ activeFilter, counts, onChange }: Props) => (
  <div className="flex flex-wrap gap-2">
    {FILTERS.map((filter) => {
      const isActive = activeFilter === filter
      const count = counts[filter]
      return (
        <button
          key={filter}
          type="button"
          onClick={() => onChange(filter)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            isActive
              ? 'bg-violet-600 text-white'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
          }`}
        >
          {WATCHLIST_FILTER_LABELS[filter]} ({count})
        </button>
      )
    })}
  </div>
)