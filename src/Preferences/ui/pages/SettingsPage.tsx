import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../Auth/data/hooks/useAuth'
import { Button } from '../../../Common'
import { ThemeToggle } from '../components/ThemeToggle'
import { LanguageSelect } from '../components/LanguageSelect'
import { RegionSelect } from '../components/RegionSelect'
import { SettingsSection } from '../components/SettingsSection'
import { useSettingsController } from '../controllers/useSettingsController'

export const SettingsPage = observer(() => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const {
    theme, language, region,
    languageOptions, regionOptions,
    setTheme, setLanguage, setRegion,
  } = useSettingsController()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>

      <div className="flex flex-col gap-6">
        <SettingsSection title="Appearance">
          <p className="mb-3 text-sm text-slate-500 dark:text-zinc-400">
            Choose light or dark mode. Defaults to your system preference on first visit.
          </p>
          <ThemeToggle theme={theme} onChange={setTheme} />
        </SettingsSection>

        <SettingsSection title="Language">
          <p className="mb-3 text-sm text-slate-500 dark:text-zinc-400">
            Stored for now. Full translations will be enabled in a future update.
          </p>
          <LanguageSelect
            value={language}
            options={languageOptions}
            onChange={setLanguage}
            disabled={false}
          />
        </SettingsSection>

        <SettingsSection title="Region">
          <RegionSelect
            value={region}
            options={regionOptions}
            onChange={setRegion}
          />
        </SettingsSection>

        <SettingsSection title="Account">
          <Button variant="ghost" onClick={handleLogout} className="text-red-500">
            Logout
          </Button>
        </SettingsSection>
      </div>
    </div>
  )
})