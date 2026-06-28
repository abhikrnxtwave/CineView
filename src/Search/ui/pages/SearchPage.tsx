import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { PosterImage, SectionState } from '../../../Common'
import { useSearchController } from '../controllers/useSearchController'

export const SearchPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const { status, grouped } = useSearchController(query)

  useEffect(() => {
    if (!query.trim()) {
      navigate('/', { replace: true })
    }
  }, [query, navigate])

  if (!query.trim()) return null

  return (
    <div className="px-4 py-8 lg:px-8">
      <h1 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Results for &quot;{query}&quot;
      </h1>

      <SectionState
        status={status}
        isEmpty={
          status === 'success' &&
          !grouped.movies.length &&
          !grouped.tv.length &&
          !grouped.people.length
        }
      >
        {grouped.movies.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
              Movies
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {(grouped.movies as Array<{ id: number; title?: string; poster_path: string | null }>).map(
                (m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => navigate(`/movies/${m.id}`)}
                    className="text-left"
                  >
                    <PosterImage
                      path={m.poster_path}
                      alt={m.title ?? 'Movie'}
                      className="aspect-[2/3] w-full rounded-xl object-cover"
                    />
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700 dark:text-zinc-300">
                      {m.title}
                    </p>
                  </button>
                ),
              )}
            </div>
          </section>
        )}

        {grouped.tv.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
              TV Shows
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {(grouped.tv as Array<{ id: number; name?: string; poster_path: string | null }>).map(
                (s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate(`/tv/${s.id}`)}
                    className="text-left"
                  >
                    <PosterImage
                      path={s.poster_path}
                      alt={s.name ?? 'Show'}
                      className="aspect-[2/3] w-full rounded-xl object-cover"
                    />
                    <p className="mt-1 line-clamp-2 text-sm text-slate-700 dark:text-zinc-300">
                      {s.name}
                    </p>
                  </button>
                ),
              )}
            </div>
          </section>
        )}

        {grouped.people.length > 0 && (
          <section>
            <h2 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">
              People
            </h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
              {(grouped.people as Array<{ id: number; name: string; profile_path: string | null }>).map(
                (p) => (
                  <div key={p.id} className="text-center">
                    <PosterImage
                      path={p.profile_path}
                      alt={p.name}
                      className="mx-auto h-24 w-24 rounded-full object-cover"
                      size="profile"
                    />
                    <p className="mt-2 text-sm text-slate-700 dark:text-zinc-300">{p.name}</p>
                  </div>
                ),
              )}
            </div>
          </section>
        )}
      </SectionState>
    </div>
  )
}