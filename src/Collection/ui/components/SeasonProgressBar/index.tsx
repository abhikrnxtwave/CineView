type Props = { watched: number; total: number; label?: string }

export const SeasonProgressBar = ({ watched, total, label = 'Season progress' }: Props) => {
  const percent = total > 0 ? Math.round((watched / total) * 100) : 0
  return (
    <div className="mb-4">
      <div className="mb-1 flex justify-between text-sm text-slate-600 dark:text-zinc-400">
        <span>{label}</span>
        <span>{watched}/{total} ({percent}%)</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-zinc-800">
        <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}