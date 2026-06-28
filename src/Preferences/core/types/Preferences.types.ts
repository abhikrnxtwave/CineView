export type Theme = 'light' | 'dark'
export type Language = 'en' | 'hi'  // stored now; i18n later
export type Region = 'US' | 'IN' | 'GB' | 'DE'  // extend as needed

export type Preferences = {
  theme: Theme
  language: Language
  region: Region
}

export type RegionOption = { code: Region; label: string }
export type LanguageOption = { code: Language; label: string }