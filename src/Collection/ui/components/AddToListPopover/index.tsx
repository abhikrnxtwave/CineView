import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { AddWatchlistInput } from '../../../core/types/Collection.types'
import { useCollection } from '../../../data/hooks/useCollection'
import { CreateListModal } from '../CreateListModal'

type Props = AddWatchlistInput

export const AddToListPopover = observer(({ mediaType, mediaId, snapshot }: Props) => {
  const { lists, isInList, toggleListItem, createList } = useCollection()
  const [open, setOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuStyle, setMenuStyle] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  const updateMenuPosition = () => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const menuWidth = 208 // w-52
    const gap = 4

    let left = rect.right - menuWidth
    left = Math.max(8, Math.min(left, window.innerWidth - menuWidth - 8))

    setMenuStyle({
      top: rect.bottom + gap,
      left,
    })
  }

  useEffect(() => {
    if (!open) return

    updateMenuPosition()

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      if (
        buttonRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return
      }
      setOpen(false)
    }

    const handleReposition = () => updateMenuPosition()

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('scroll', handleReposition, true)
      window.removeEventListener('resize', handleReposition)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setOpen((v) => !v)
        }}
        className="rounded-full bg-black/60 p-2 text-xs text-white hover:bg-violet-600 dark:bg-black/70"
        aria-label="Add to list"
        aria-expanded={open}
      >
        ☰
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: menuStyle.top, left: menuStyle.left }}
            className="fixed z-[9999] w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="px-2 py-1 text-xs font-medium uppercase text-slate-500 dark:text-zinc-500">
              Add to list
            </p>
            {lists.length === 0 ? (
              <p className="px-2 py-2 text-xs text-slate-500">No lists yet</p>
            ) : (
              lists.map((list) => (
                <label
                  key={list.id}
                  className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 hover:bg-slate-100 dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={isInList(list.id, mediaType, mediaId)}
                    onChange={() => toggleListItem(list.id, { mediaType, mediaId, snapshot })}
                  />
                  <span className="truncate text-sm text-slate-800 dark:text-zinc-200">
                    {list.name}
                  </span>
                </label>
              ))
            )}
            <button
              type="button"
              onClick={() => {
                setCreateOpen(true)
                setOpen(false)
              }}
              className="mt-1 w-full rounded-lg px-2 py-2 text-left text-sm text-violet-600 hover:bg-violet-500/10 dark:text-violet-400"
            >
              + Create new list
            </button>
          </div>,
          document.body,
        )}

      <CreateListModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={(name, description) => {
          const id = createList(name, description)
          toggleListItem(id, { mediaType, mediaId, snapshot })
        }}
      />
    </>
  )
})