import type { Theme } from '../../../core/types/Preferences.types'

type Props = { theme: Theme; onChange: (theme: Theme) => void }

export const ThemeToggle = ({ theme, onChange }: Props) => (
  <div className="flex gap-2">
    {(['light', 'dark'] as Theme[]).map((value) => (
      <button
        key={value}
        type="button"
        onClick={() => onChange(value)}
        className={`rounded-xl px-4 py-2 text-sm font-medium capitalize transition ${
          theme === value
            ? 'bg-violet-600 text-white'
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'
        }`}
      >
        {value}
      </button>
    ))}
  </div>
)