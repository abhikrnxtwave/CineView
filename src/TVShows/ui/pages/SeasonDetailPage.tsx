import { useParams } from 'react-router-dom'
import { ErrorBoundary, PosterImage, SectionState } from '../../../Common'
import { useSeasonController } from '../controllers/useSeasonController'

export const SeasonDetailPage = () => {
  const { id, seasonNumber } = useParams()
  const showId = Number(id)
  const seasonNum = Number(seasonNumber)
  const { season, status } = useSeasonController(showId, seasonNum)

  return (
    <ErrorBoundary>
      <section className="px-4 py-6 lg:px-8">
        <SectionState status={status} isEmpty={!season?.episodes.length}>
          <h2 className="mb-4 text-xl font-semibold text-white">{season?.name}</h2>
          <div className="space-y-3">
            {season?.episodes.map((ep) => (
              <div key={ep.id} className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <input
                  type="checkbox"
                  disabled
                  title="Episode tracking coming in Milestone 6"
                  className="mt-1"
                />
                <PosterImage
                  path={ep.still_path}
                  alt={ep.name}
                  className="h-20 w-36 shrink-0 rounded-lg object-cover"
                  size="backdrop"
                />
                <div>
                  <p className="font-medium text-white">
                    {ep.episode_number}. {ep.name}
                  </p>
                  {ep.air_date && <p className="text-xs text-zinc-500">{ep.air_date}</p>}
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{ep.overview}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionState>
      </section>
    </ErrorBoundary>
  )
}