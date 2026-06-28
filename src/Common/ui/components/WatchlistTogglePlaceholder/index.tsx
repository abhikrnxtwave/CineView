type Props = { onClick?: () => void }

export const WatchlistTogglePlaceholder = ({ onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    title="Watchlist (coming soon)"
    className="rounded-full bg-black/60 p-2 text-white hover:bg-violet-600"
    aria-label="Add to watchlist"
  >
    +
  </button>
)