import { useEffect, useState } from 'react'
import {
  NOTE_WARNING_THRESHOLD,
  WATCHLIST_NOTE_MAX_LENGTH,
} from '../../../core/constants/Collection.constants'

type Props = {
  value: string
  onSave: (note: string) => void
  onClear: () => void
}

export const InlineNoteEditor = ({ value, onSave, onClear }: Props) => {
  const [draft, setDraft] = useState(value)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    setDraft(value)
  }, [value])

  const handleSave = () => {
    onSave(draft)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setDraft(value)
    setIsEditing(false)
  }

  const nearLimit = draft.length >= NOTE_WARNING_THRESHOLD

  if (!isEditing) {
    return (
      <div>
        {value ? (
          <p className="text-sm text-slate-700 dark:text-zinc-300">{value}</p>
        ) : (
          <p className="text-sm italic text-slate-400 dark:text-zinc-500">No note yet</p>
        )}
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="mt-2 text-sm text-violet-600 hover:underline dark:text-violet-400"
        >
          {value ? 'Edit note' : 'Add note'}
        </button>
      </div>
    )
  }

  return (
    <div>
      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        maxLength={WATCHLIST_NOTE_MAX_LENGTH}
        rows={3}
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
      />
      <p className={`mt-1 text-xs ${nearLimit ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-zinc-500'}`}>
        {draft.length}/{WATCHLIST_NOTE_MAX_LENGTH}
        {nearLimit && ' — approaching limit'}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" onClick={handleSave} className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white">
          Save
        </button>
        <button type="button" onClick={handleCancel} className="rounded-lg px-3 py-1.5 text-xs text-slate-600 dark:text-zinc-300">
          Cancel
        </button>
        {value && (
          <button
            type="button"
            onClick={() => { onClear(); setDraft(''); setIsEditing(false) }}
            className="rounded-lg px-3 py-1.5 text-xs text-red-600 dark:text-red-300"
          >
            Clear note
          </button>
        )}
      </div>
    </div>
  )
}