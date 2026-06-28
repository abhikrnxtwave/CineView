import { observer } from 'mobx-react-lite'
import type { AddWatchlistInput } from '../../../core/types/Collection.types'
import { useCollection } from '../../../data/hooks/useCollection'

type Props = AddWatchlistInput & { variant?: 'card' | 'detail' }

export const WatchlistToggle = observer(({ mediaType, mediaId, snapshot, variant = 'card' }: Props) => {
  const { isInWatchlist, toggleWatchlist, getWatchlistEntry } = useCollection()
  const inList = isInWatchlist(mediaType, mediaId)
  const entry = getWatchlistEntry(mediaType, mediaId)
  const hasNote = !!entry?.note

  const sizeClass = variant === 'detail' ? 'relative rounded-xl px-3 py-2 text-sm font-medium' : 'relative rounded-full p-2'

  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); toggleWatchlist({ mediaType, mediaId, snapshot }) }}
      title={inList ? 'Remove from watchlist' : 'Add to watchlist'}
      aria-pressed={inList}
      className={`transition ${sizeClass} ${inList ? 'bg-violet-600 text-white hover:bg-violet-500' : 'bg-black/60 text-white hover:bg-violet-600 dark:bg-black/70'}`}
    >
      {inList ? '✓' : '+'}
      {variant === 'detail' && hasNote && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-amber-400 ring-2 ring-white dark:ring-zinc-900" />
      )}
    </button>
  )
})