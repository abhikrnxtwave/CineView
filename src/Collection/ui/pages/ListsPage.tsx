import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateListModal } from '../components/CreateListModal'
import { ListCard } from '../components/ListCard'
import { useCollection } from '../../data/hooks/useCollection'

export const ListsPage = observer(() => {
  const navigate = useNavigate()
  const { lists, createList } = useCollection()
  const [createOpen, setCreateOpen] = useState(false)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Lists</h1>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500"
        >
          + Create List
        </button>
      </div>

      {lists.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-zinc-700 dark:text-zinc-400">
          No custom lists yet. Create one to organize your favorites.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lists.map((list) => (
            <ListCard key={list.id} list={list} onClick={() => navigate(`/lists/${list.id}`)} />
          ))}
        </div>
      )}

      <CreateListModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(name, description) => createList(name, description)}
      />
    </div>
  )
})