import type { ReactNode } from 'react'
import type { SectionStatus } from '../../../core/types/Tmdb.types'

type Props = {
  status: SectionStatus
  errorMessage?: string
  isEmpty?: boolean
  children: ReactNode
}

export const SectionState = ({ status, errorMessage, isEmpty, children }: Props) => {
  if (status === 'loading') {
    return (
      <div className="h-40 animate-pulse rounded-xl bg-slate-200 dark:bg-zinc-800/60" />
    )
  }
  if (status === 'error') {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-600 dark:text-red-300">
        {errorMessage ?? 'Failed to load this section.'}
      </div>
    )
  }
  if (isEmpty) {
    return (
      <p className="text-sm text-slate-500 dark:text-zinc-500">No results found.</p>
    )
  }
  return <>{children}</>
}