import { ErrorBoundary, SectionState } from '../../../../Common'
import type { MovieSummary, SectionStatus } from '../../../../Common/core/types/Tmdb.types'
import { MovieCard } from '../MovieCard'

type Props = {
  title: string
  items: MovieSummary[]
  status: SectionStatus
  onCardClick: (id: number) => void
}

export const ContentRow = ({ title, items, status, onCardClick }: Props) => (
  <ErrorBoundary>
    <section className="mb-8">
      <h2 className="mb-3 px-4 text-lg font-semibold text-slate-900 lg:px-8 dark:text-white">
        {title}
      </h2>
      <SectionState status={status} isEmpty={status === 'success' && items.length === 0}>
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {items.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onClick={() => onCardClick(movie.id)} />
          ))}
        </div>
      </SectionState>
    </section>
  </ErrorBoundary>
)