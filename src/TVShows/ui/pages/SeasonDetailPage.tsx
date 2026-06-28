import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { ErrorBoundary, SectionState } from '../../../Common'
import { EpisodeRow } from '../../../Collection/ui/components/EpisodeRow'
import { SeasonProgressBar } from '../../../Collection/ui/components/SeasonProgressBar'
import { useCollection } from '../../../Collection/data/hooks/useCollection'
import { useSeasonController } from '../controllers/useSeasonController'

export const SeasonDetailPage = observer(() => {
  const { id, seasonNumber } = useParams()
  const showId = Number(id)
  const seasonNum = Number(seasonNumber)
  const { season, status } = useSeasonController(showId, seasonNum)
  const { isEpisodeWatched, toggleEpisode, markSeason, unmarkSeason, getSeasonProgress } = useCollection()

  const episodes = season?.episodes ?? []
  const progress = getSeasonProgress(showId, seasonNum, episodes.length)
  const episodeNumbers = episodes.map((ep) => ep.episode_number)

  return (
    <ErrorBoundary>
      <section className="px-4 py-6 lg:px-8">
        <SectionState status={status} isEmpty={!episodes.length}>
          <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-white">{season?.name}</h2>

          <SeasonProgressBar watched={progress.watched} total={progress.total} />

          <div className="mb-4 flex gap-2">
            <button
              type="button"
              onClick={() => markSeason(showId, seasonNum, episodeNumbers)}
              className="rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-medium text-white"
            >
              Mark all
            </button>
            <button
              type="button"
              onClick={() => unmarkSeason(showId, seasonNum)}
              className="rounded-lg border px-3 py-1.5 text-xs dark:border-zinc-700"
            >
              Unmark all
            </button>
          </div>

          <div className="space-y-3">
            {episodes.map((ep) => (
              <EpisodeRow
                key={ep.id}
                episode={ep}
                checked={isEpisodeWatched(showId, seasonNum, ep.episode_number)}
                onToggle={() => toggleEpisode(showId, seasonNum, ep.episode_number)}
              />
            ))}
          </div>
        </SectionState>
      </section>
    </ErrorBoundary>
  )
})