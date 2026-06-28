import type { Genre, SectionStatus } from '../../../../Common/core/types/Tmdb.types'
import { SectionState } from '../../../../Common'

type Props = {
  genres: Genre[]
  activeGenreId: number | null
  status: SectionStatus
  onSelect: (id: number | null) => void
}

export const GenreFilter = ({ genres, activeGenreId, status, onSelect }: Props) => (
  <SectionState status={status}>
    <div className="flex gap-2 overflow-x-auto px-4 pb-4 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`shrink-0 rounded-full px-4 py-1.5 text-sm ${
          activeGenreId === null
            ? 'bg-violet-600 text-white'
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
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
            activeGenreId === genre.id
              ? 'bg-violet-600 text-white'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  </SectionState>
)