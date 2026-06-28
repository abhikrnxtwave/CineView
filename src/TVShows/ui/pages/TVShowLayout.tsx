import { NavLink, Outlet, useParams } from 'react-router-dom'
import { ErrorBoundary, PosterImage } from '../../../Common'
import { useTVShowController } from '../controllers/useTVShowController'

const seasonTabInactiveClass =
  'bg-slate-200 text-slate-700 hover:bg-slate-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'

export const TVShowLayout = () => {
  const { id } = useParams()
  const showId = Number(id)
  const { show, status } = useTVShowController(showId)

  if (status === 'loading') {
    return (
      <div className="p-8 text-slate-500 dark:text-zinc-400">
        Loading show...
      </div>
    )
  }

  if (status === 'error' || !show) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-8 text-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            TV Show not found
          </h1>
          <p className="mt-2 text-slate-500 dark:text-zinc-400">
            Invalid show ID.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-10">
      <ErrorBoundary>
        <section className="flex gap-6 px-4 py-8 lg:px-8">
          <PosterImage
            path={show.poster_path}
            alt={show.name}
            className="w-40 rounded-xl"
            size="posterLarge"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {show.name}
            </h1>
            <p className="mt-4 max-w-3xl text-slate-600 dark:text-zinc-300">
              {show.overview}
            </p>
          </div>
        </section>
      </ErrorBoundary>

      <nav className="flex gap-2 overflow-x-auto px-4 pb-4 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {show.seasons
          .filter((s) => s.season_number > 0)
          .map((season) => (
            <NavLink
              key={season.id}
              to={`/tv/${showId}/season/${season.season_number}`}
              className={({ isActive }) =>
                `shrink-0 rounded-lg px-3 py-2 text-sm ${
                  isActive ? 'bg-violet-600 text-white' : seasonTabInactiveClass
                }`
              }
            >
              {season.name}
            </NavLink>
          ))}
      </nav>

      <Outlet context={{ show }} />
    </div>
  )
}