type Props = { watched: number; total: number }

export const ShowProgressBadge = ({ watched, total }: Props) => {
  if (total <= 0) return null
  return (
    <span className="inline-flex rounded-full bg-violet-600/15 px-2.5 py-1 text-xs font-medium text-violet-700 dark:text-violet-300">
      {watched}/{total} episodes watched
    </span>
  )
}