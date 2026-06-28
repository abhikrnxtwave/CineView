import type { Language, Preferences, Region, Theme } from '../types/Preferences.types'

export const PREFERENCES_STORAGE_KEY = 'cineview_preferences'

export const DEFAULT_LANGUAGE: Language = 'en'
export const DEFAULT_REGION: Region = 'US'

export const LANGUAGE_OPTIONS = [
  { code: 'en' as const, label: 'English' },
  { code: 'hi' as const, label: 'Hindi' },
]

export const REGION_OPTIONS = [
  { code: 'US' as const, label: 'United States' },
  { code: 'IN' as const, label: 'India' },
  { code: 'GB' as const, label: 'United Kingdom' },
  { code: 'DE' as const, label: 'Germany' },
]

export const getSystemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export const getDefaultPreferences = (): Preferences => ({
  theme: getSystemTheme(),
  language: DEFAULT_LANGUAGE,
  region: DEFAULT_REGION,
})