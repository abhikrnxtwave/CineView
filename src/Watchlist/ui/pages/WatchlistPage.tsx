import { observer } from 'mobx-react-lite'
import { WatchlistEmptyState } from '../components/WatchlistEmptyState'
import { WatchlistFilterTabs } from '../components/WatchlistFilterTabs'
import { WatchlistItem } from '../components/WatchlistItem'
import { WatchlistSortSelect } from '../components/WatchlistSortSelect'
import { useWatchlistPageController } from '../controllers/useWatchlistPageController'

export const WatchlistPage = observer(() => {
  const {
    activeFilter,
    sortBy,
    countByStatus,
    filteredEntries,
    setActiveFilter,
    setSortBy,
    updateStatus,
    updateNote,
    remove,
  } = useWatchlistPageController()

  const isEmpty = countByStatus.all === 0
  const isFilteredEmpty = !isEmpty && filteredEntries.length === 0

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">Watchlist</h1>
      <p className="mb-6 text-sm text-slate-500 dark:text-zinc-400">
        Track movies and shows you want to watch, are watching, or have completed.
      </p>

      {isEmpty ? (
        <WatchlistEmptyState />
      ) : (
        <>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <WatchlistFilterTabs
              activeFilter={activeFilter}
              counts={countByStatus}
              onChange={setActiveFilter}
            />
            <WatchlistSortSelect value={sortBy} onChange={setSortBy} />
          </div>

          {isFilteredEmpty ? (
            <p className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              No items in this filter.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {filteredEntries.map((entry) => (
                <WatchlistItem
                  key={entry.id}
                  entry={entry}
                  onStatusChange={updateStatus}
                  onNoteChange={updateNote}
                  onRemove={remove}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
})