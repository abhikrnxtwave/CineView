import type { LanguageOption } from '../../../core/types/Preferences.types'
import type { Language } from '../../../core/types/Preferences.types'

type Props = {
  value: Language
  options: LanguageOption[]
  onChange: (value: Language) => void
  disabled?: boolean
}

export const LanguageSelect = ({
  value,
  options,
  onChange,
  disabled = false,
}: Props) => (
  <div>
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value as Language)}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
    >
      {options.map((option) => (
        <option key={option.code} value={option.code}>
          {option.label}
        </option>
      ))}
    </select>
    <p className="mt-2 text-xs text-slate-500 dark:text-zinc-500">
      UI translations will be added later.
    </p>
  </div>
)