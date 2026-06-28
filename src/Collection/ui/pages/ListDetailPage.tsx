import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PosterImage } from '../../../Common'
import { useCollection } from '../../data/hooks/useCollection'
import { ConfirmDialog } from '../components/ConfirmDialog'

export const ListDetailPage = observer(() => {
  const { listId = '' } = useParams()
  const navigate = useNavigate()
  const { getList, renameList, deleteList, removeFromList } = useCollection()
  const list = getList(listId)

  const [nameDraft, setNameDraft] = useState('')
  const [isEditingName, setIsEditingName] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (!list) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">List not found</h1>
        <Link to="/lists" className="mt-4 text-violet-600 dark:text-violet-400">Back to My Lists</Link>
      </div>
    )
  }

  const saveRename = () => {
    const trimmed = nameDraft.trim()
    if (trimmed) renameList(list.id, trimmed)
    setIsEditingName(false)
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 lg:px-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          {isEditingName ? (
            <input
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              onBlur={saveRename}
              onKeyDown={(e) => e.key === 'Enter' && saveRename()}
              maxLength={60}
              className="rounded-xl border px-3 py-2 text-2xl font-bold dark:bg-zinc-800 dark:text-white"
              autoFocus
            />
          ) : (
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{list.name}</h1>
          )}
          {list.description && (
            <p className="mt-2 text-sm text-slate-500 dark:text-zinc-400">{list.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => { setNameDraft(list.name); setIsEditingName(true) }}
            className="rounded-xl border px-3 py-2 text-sm dark:border-zinc-700"
          >
            Rename
          </button>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="rounded-xl border border-red-500/30 px-3 py-2 text-sm text-red-600 dark:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>

      {list.items.length === 0 ? (
        <p className="rounded-2xl border border-dashed p-8 text-center text-slate-500 dark:border-zinc-700">
          This list is empty. Add items from movie or TV pages.
        </p>
      ) : (
        <div className="space-y-3">
          {list.items.map((item) => {
            const path = item.mediaType === 'movie' ? `/movies/${item.mediaId}` : `/tv/${item.mediaId}`
            return (
              <div key={item.id} className="flex items-center gap-4 rounded-xl border p-4 dark:border-zinc-800">
                <Link to={path}>
                  <PosterImage path={item.snapshot.posterPath} alt={item.snapshot.title} className="h-20 w-14 rounded object-cover" />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link to={path} className="font-medium text-slate-900 hover:text-violet-600 dark:text-white">
                    {item.snapshot.title}
                  </Link>
                  <p className="text-xs uppercase text-slate-500">{item.mediaType}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromList(list.id, item.id)}
                  className="text-sm text-red-600 dark:text-red-300"
                >
                  Remove
                </button>
              </div>
            )
          })}
        </div>
      )}

      <ConfirmDialog
        isOpen={deleteOpen}
        title="Delete list?"
        message="This removes the list only. Watchlist entries are not affected."
        confirmLabel="Delete"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => { deleteList(list.id); navigate('/lists') }}
      />
    </div>
  )
})