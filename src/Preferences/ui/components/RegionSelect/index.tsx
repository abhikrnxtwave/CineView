import type { Region, RegionOption } from '../../../core/types/Preferences.types'

type Props = {
  value: Region
  options: RegionOption[]
  onChange: (value: Region) => void
}

export const RegionSelect = ({ value, options, onChange }: Props) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value as Region)}
    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
  >
    {options.map((option) => (
      <option key={option.code} value={option.code}>
        {option.label}
      </option>
    ))}
  </select>
)