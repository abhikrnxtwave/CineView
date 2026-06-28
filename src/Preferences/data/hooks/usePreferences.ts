import { usePreferencesStore } from '../stores/providers'

export const usePreferences = () => {
  const store = usePreferencesStore()
  return {
    theme: store.theme,
    language: store.language,
    region: store.region,
    isDark: store.isDark,
    isHydrated: store.isHydrated,
    setTheme: store.setTheme.bind(store),
    toggleTheme: store.toggleTheme.bind(store),
    setLanguage: store.setLanguage.bind(store),
    setRegion: store.setRegion.bind(store),
  }
}