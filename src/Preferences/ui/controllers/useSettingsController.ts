import { usePreferencesStore } from '../../data/stores/providers'
import { LANGUAGE_OPTIONS, REGION_OPTIONS } from '../../core/constants/Preferences.constants'
import type { Language, Region, Theme } from '../../core/types/Preferences.types'

export const useSettingsController = () => {
  const store = usePreferencesStore()

  return {
    theme: store.theme,
    language: store.language,
    region: store.region,
    languageOptions: LANGUAGE_OPTIONS,
    regionOptions: REGION_OPTIONS,
    setTheme: (theme: Theme) => store.setTheme(theme),
    setLanguage: (language: Language) => store.setLanguage(language),
    setRegion: (region: Region) => store.setRegion(region),
  }
}