import { PosterImage } from '../../../../Common'
import type { MovieSummary } from '../../../../Common/core/types/Tmdb.types'
import { MediaCollectionActions } from '../../../../Collection'

type Props = {
  movie: MovieSummary
  onClick: () => void
}

export const MovieCard = ({ movie, onClick }: Props) => (
  <div className="group relative w-36 shrink-0 cursor-pointer sm:w-40" onClick={onClick}>
    <div className="relative overflow-hidden rounded-xl">
      <PosterImage
        path={movie.poster_path}
        alt={movie.title}
        className="aspect-[2/3] w-full object-cover transition group-hover:scale-105"
      />
      <span className="absolute bottom-2 left-2 rounded bg-black/70 px-1.5 py-0.5 text-xs text-yellow-400">
        ★ {movie.vote_average.toFixed(1)}
      </span>
    </div>

    {/* Outside overflow-hidden so popover is not clipped */}
    <div
      className="absolute right-2 top-2 z-10"
      onClick={(e) => e.stopPropagation()}
    >
      <MediaCollectionActions
        mediaType="movie"
        mediaId={movie.id}
        snapshot={{
          title: movie.title,
          posterPath: movie.poster_path,
          voteAverage: movie.vote_average,
        }}
      />
    </div>

    <p className="mt-2 line-clamp-2 text-sm text-slate-800 dark:text-zinc-200">{movie.title}</p>
  </div>
)