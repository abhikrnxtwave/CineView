import { observer } from 'mobx-react-lite'
import type { AddWatchlistInput } from '../../../core/types/Watchlist.types'
import { useWatchlist } from '../../../data/hooks/useWatchlist'

type Props = AddWatchlistInput & {
  variant?: 'card' | 'detail'
}

export const WatchlistToggle = observer(({
  mediaType,
  mediaId,
  snapshot,
  variant = 'card',
}: Props) => {
  const { isInWatchlist, toggle } = useWatchlist()
  const inList = isInWatchlist(mediaType, mediaId)

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    toggle({ mediaType, mediaId, snapshot })
  }

  const sizeClass =
    variant === 'detail'
      ? 'rounded-xl px-3 py-2 text-sm font-medium'
      : 'rounded-full p-2'

  return (
    <button
      type="button"
      onClick={handleClick}
      title={inList ? 'Remove from watchlist' : 'Add to watchlist'}
      aria-label={inList ? 'Remove from watchlist' : 'Add to watchlist'}
      aria-pressed={inList}
      className={`transition ${sizeClass} ${
        inList
          ? 'bg-violet-600 text-white hover:bg-violet-500'
          : 'bg-black/60 text-white hover:bg-violet-600 dark:bg-black/70'
      }`}
    >
      {inList ? '✓' : '+'}
    </button>
  )
})