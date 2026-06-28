import { PosterImage } from '../../../../Common'
import type { Episode } from '../../../../Common/core/types/Tmdb.types'

type Props = {
  episode: Episode
  checked: boolean
  onToggle: () => void
}

export const EpisodeRow = ({ episode, checked, onToggle }: Props) => (
  <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
    <input type="checkbox" checked={checked} onChange={onToggle} className="mt-1 h-4 w-4" />
    <PosterImage path={episode.still_path} alt={episode.name} className="h-20 w-36 shrink-0 rounded-lg object-cover" size="backdrop" />
    <div>
      <p className="font-medium text-slate-900 dark:text-white">
        {episode.episode_number}. {episode.name}
      </p>
      {episode.air_date && <p className="text-xs text-slate-500">{episode.air_date}</p>}
      <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-zinc-400">{episode.overview}</p>
    </div>
  </div>
)
