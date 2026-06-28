import { makeAutoObservable, runInAction } from 'mobx'
import {
  getDefaultPreferences,
  PREFERENCES_STORAGE_KEY,
} from '../../../core/constants/Preferences.constants'
import { preferencesSchema } from '../../../core/types/Preferences.schema'
import type { Language, Preferences, Region, Theme } from '../../../core/types/Preferences.types'

export class PreferencesStore {
  theme: Theme = 'dark'
  language: Language = 'en'
  region: Region = 'US'
  isHydrated = false

  constructor() {
    makeAutoObservable(this)
  }

  get isDark() {
    return this.theme === 'dark'
  }

  // Stub for future TMDB i18n wiring
  get tmdbLanguage() {
    return this.language
  }

  hydrate() {
    const defaults = getDefaultPreferences()

    try {
      const raw = localStorage.getItem(PREFERENCES_STORAGE_KEY)
      if (!raw) {
        this.applyPreferences(defaults)
        this.persist()
        return
      }

      const parsed = preferencesSchema.parse(JSON.parse(raw))
      this.applyPreferences(parsed)
    } catch {
      this.applyPreferences(defaults)
      this.persist()
    } finally {
      runInAction(() => {
        this.isHydrated = true
      })
      this.applyThemeToDocument()
    }
  }

  setTheme(theme: Theme) {
    this.theme = theme
    this.persist()
    this.applyThemeToDocument()
  }

  toggleTheme() {
    this.setTheme(this.theme === 'dark' ? 'light' : 'dark')
  }

  setLanguage(language: Language) {
    this.language = language
    this.persist()
    // i18n: changeLanguage() will go here later
  }

  setRegion(region: Region) {
    this.region = region
    this.persist()
    // TMDB region param wiring later
  }

  private applyPreferences(prefs: Preferences) {
    this.theme = prefs.theme
    this.language = prefs.language
    this.region = prefs.region
  }

  private persist() {
    const data = preferencesSchema.parse({
      theme: this.theme,
      language: this.language,
      region: this.region,
    })
    localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(data))
  }

  applyThemeToDocument() {
    document.documentElement.setAttribute('data-theme', this.theme)
    document.documentElement.classList.toggle('dark', this.theme === 'dark')
  }
}

export const preferencesStore = new PreferencesStore()