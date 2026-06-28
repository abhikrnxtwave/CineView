import { useState } from 'react'
import {
  LIST_DESCRIPTION_MAX_LENGTH,
  LIST_NAME_MAX_LENGTH,
} from '../../../core/constants/Collection.constants'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreate: (name: string, description: string) => void
}

export const CreateListModal = ({ isOpen, onClose, onCreate }: Props) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    onCreate(trimmed, description.trim())
    setName('')
    setDescription('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Create List</h2>
        <div className="mt-4 flex flex-col gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={LIST_NAME_MAX_LENGTH}
            placeholder="List name"
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            autoFocus
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={LIST_DESCRIPTION_MAX_LENGTH}
            placeholder="Description (optional)"
            rows={3}
            className="resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm text-slate-600 dark:text-zinc-300">
            Cancel
          </button>
          <button type="submit" className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-500">
            Create
          </button>
        </div>
      </form>
    </div>
  )
}