import { PosterImage } from '../../../../Common'
import type { CustomList } from '../../../core/types/Collection.types'

type Props = { list: CustomList; onClick: () => void }

export const ListCard = ({ list, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-violet-500 dark:border-zinc-800 dark:bg-zinc-900"
  >
    <div className="mb-3 flex gap-1">
      {list.items.slice(0, 3).map((item) => (
        <PosterImage key={item.id} path={item.snapshot.posterPath} alt="" className="h-16 w-11 rounded object-cover" />
      ))}
      {list.items.length === 0 && (
        <div className="flex h-16 w-full items-center justify-center rounded bg-slate-100 text-xs text-slate-400 dark:bg-zinc-800">
          Empty
        </div>
      )}
    </div>
    <h3 className="font-semibold text-slate-900 dark:text-white">{list.name}</h3>
    <p className="mt-1 text-xs text-slate-500 dark:text-zinc-500">{list.items.length} items</p>
  </button>
)