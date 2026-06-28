import type { ReactNode } from 'react'

type Props = { title: string; children: ReactNode }

export const SettingsSection = ({ title, children }: Props) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
    <h2 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">{title}</h2>
    {children}
  </section>
)