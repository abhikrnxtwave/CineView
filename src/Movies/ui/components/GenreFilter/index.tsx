import type { Genre, SectionStatus } from '../../../../Common/core/types/Tmdb.types'
import { SectionState } from '../../../../Common'

type Props = {
  genres: Genre[]
  activeGenreId: number | null
  status: SectionStatus
  onSelect: (id: number | null) => void
}

const inactiveClass =
  'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'

export const GenreFilter = ({ genres, activeGenreId, status, onSelect }: Props) => (
  <SectionState status={status}>
    <div className="flex gap-2 overflow-x-auto px-4 pb-4 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm ${
          activeGenreId === null ? 'bg-violet-600 text-white' : inactiveClass
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          type="button"
          onClick={() => onSelect(genre.id)}
          className={`shrink-0 rounded-full px-4 py-1.5 text-sm ${
            activeGenreId === genre.id ? 'bg-violet-600 text-white' : inactiveClass
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  </SectionState>
)