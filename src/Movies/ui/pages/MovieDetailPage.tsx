import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ErrorBoundary, PosterImage, SectionState, TrailerModal, WatchlistTogglePlaceholder } from '../../../Common'
import { ContentRow } from '../components/ContentRow'
import { useMovieDetailController } from '../controllers/useMovieDetailController'

export const MovieDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const movieId = Number(id)
  const [trailerOpen, setTrailerOpen] = useState(false)

  const {
    movie, movieStatus, cast, castStatus,
    similar, similarStatus, recommended, recommendedStatus, trailerKey,
  } = useMovieDetailController(movieId)

  if (movieStatus === 'loading') {
    return (
      <div className="p-8 animate-pulse text-slate-500 dark:text-zinc-400">
        Loading...
      </div>
    )
  }

  if (movieStatus === 'error' || !movie) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Movie not found
        </h1>
        <p className="mt-2 text-slate-500 dark:text-zinc-400">
          The movie you are looking for does not exist.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mt-4 text-violet-600 dark:text-violet-400"
        >
          Go Home
        </button>
      </div>
    )
  }

  return (
    <div className="pb-10">
      <ErrorBoundary>
        <section className="relative px-4 py-8 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row">
            <PosterImage
              path={movie.poster_path}
              alt={movie.title}
              className="w-48 rounded-xl object-cover"
              size="posterLarge"
            />
            <div>
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {movie.title}
                </h1>
                <WatchlistTogglePlaceholder />
              </div>
              <p className="mt-2 text-yellow-500 dark:text-yellow-400">
                ★ {movie.vote_average.toFixed(1)}
              </p>
              <p className="mt-4 max-w-3xl text-slate-600 dark:text-zinc-300">
                {movie.overview}
              </p>
              {trailerKey && (
                <button
                  type="button"
                  onClick={() => setTrailerOpen(true)}
                  className="mt-4 rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
                >
                  ▶ Trailer
                </button>
              )}
            </div>
          </div>
        </section>
      </ErrorBoundary>

      <ErrorBoundary>
        <section className="px-4 lg:px-8">
          <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
            Cast
          </h2>
          <SectionState status={castStatus} isEmpty={cast.length === 0}>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {cast.slice(0, 15).map((person) => (
                <div key={person.id} className="w-24 shrink-0 text-center">
                  <PosterImage
                    path={person.profile_path}
                    alt={person.name}
                    className="mx-auto h-24 w-24 rounded-full object-cover"
                    size="profile"
                  />
                  <p className="mt-2 text-xs text-slate-800 dark:text-white">
                    {person.name}
                  </p>
                </div>
              ))}
            </div>
          </SectionState>
        </section>
      </ErrorBoundary>

      <ContentRow
        title="Similar"
        items={similar}
        status={similarStatus}
        onCardClick={(mid) => navigate(`/movies/${mid}`)}
      />
      <ContentRow
        title="Recommended"
        items={recommended}
        status={recommendedStatus}
        onCardClick={(mid) => navigate(`/movies/${mid}`)}
      />

      <TrailerModal
        isOpen={trailerOpen}
        videoKey={trailerKey}
        title={movie.title}
        onClose={() => setTrailerOpen(false)}
      />
    </div>
  )
}