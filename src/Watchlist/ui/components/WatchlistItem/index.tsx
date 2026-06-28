import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PosterImage } from '../../../../Common'
import { WATCHLIST_NOTE_MAX_LENGTH, WATCHLIST_STATUSES, WATCHLIST_STATUS_LABELS } from '../../../core/constants/Watchlist.constants'
import type { WatchlistEntry, WatchlistStatus } from '../../../core/types/Watchlist.types'

type Props = {
  entry: WatchlistEntry
  onStatusChange: (id: string, status: WatchlistStatus) => void
  onNoteChange: (id: string, note: string) => void
  onRemove: (id: string) => void
}

export const WatchlistItem = ({
  entry,
  onStatusChange,
  onNoteChange,
  onRemove,
}: Props) => {
  const [note, setNote] = useState(entry.note)
  const detailPath =
    entry.mediaType === 'movie'
      ? `/movies/${entry.mediaId}`
      : `/tv/${entry.mediaId}`

  const handleNoteBlur = () => {
    if (note !== entry.note) {
      onNoteChange(entry.id, note)
    }
  }

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row dark:border-zinc-800 dark:bg-zinc-900">
      <Link to={detailPath} className="shrink-0">
        <PosterImage
          path={entry.snapshot.posterPath}
          alt={entry.snapshot.title}
          className="h-36 w-24 rounded-xl object-cover"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Link
              to={detailPath}
              className="text-lg font-semibold text-slate-900 hover:text-violet-600 dark:text-white dark:hover:text-violet-400"
            >
              {entry.snapshot.title}
            </Link>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500 dark:text-zinc-500">
              {entry.mediaType === 'movie' ? 'Movie' : 'TV Show'} · ★{' '}
              {entry.snapshot.voteAverage.toFixed(1)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRemove(entry.id)}
            className="rounded-lg px-3 py-1.5 text-sm text-red-600 hover:bg-red-500/10 dark:text-red-300"
          >
            Remove
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor={`status-${entry.id}`} className="text-sm text-slate-600 dark:text-zinc-400">
            Status
          </label>
          <select
            id={`status-${entry.id}`}
            value={entry.status}
            onChange={(e) => onStatusChange(entry.id, e.target.value as WatchlistStatus)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          >
            {WATCHLIST_STATUSES.map((status) => (
              <option key={status} value={status}>
                {WATCHLIST_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`note-${entry.id}`} className="mb-1 block text-sm text-slate-600 dark:text-zinc-400">
            Note
          </label>
          <textarea
            id={`note-${entry.id}`}
            value={note}
            maxLength={WATCHLIST_NOTE_MAX_LENGTH}
            onChange={(e) => setNote(e.target.value)}
            onBlur={handleNoteBlur}
            placeholder="Add a personal note..."
            rows={2}
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
          <p className="mt-1 text-xs text-slate-400 dark:text-zinc-500">
            {note.length}/{WATCHLIST_NOTE_MAX_LENGTH}
          </p>
        </div>
      </div>
    </article>
  )
}