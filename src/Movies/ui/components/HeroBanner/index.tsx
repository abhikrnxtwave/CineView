import { getTmdbImageUrl, SectionState } from '../../../../Common'
import type { MovieSummary, SectionStatus } from '../../../../Common/core/types/Tmdb.types'

type Props = {
  movie: MovieSummary | null
  status: SectionStatus
  onPlayTrailer: () => void
}

export const HeroBanner = ({ movie, status, onPlayTrailer }: Props) => {
  const backdrop = getTmdbImageUrl(movie?.backdrop_path, 'backdrop')

  return (
    <SectionState status={status}>
      {movie && (
        <section className="relative mb-8 h-[50vh] min-h-[320px] w-full overflow-hidden">
          {backdrop && (
            <img src={backdrop} alt="" className="absolute inset-0 h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-10 lg:px-8">
            <p className="text-sm text-violet-400">Trending Today</p>
            <h1 className="mt-2 max-w-2xl text-3xl font-bold text-white sm:text-5xl">
              {movie.title}
            </h1>
            <p className="mt-2 text-yellow-400">★ {movie.vote_average.toFixed(1)}</p>
            <button
              type="button"
              onClick={onPlayTrailer}
              className="mt-4 w-fit rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold hover:bg-violet-500"
            >
              ▶ Watch Trailer
            </button>
          </div>
        </section>
      )}
    </SectionState>
  )
}