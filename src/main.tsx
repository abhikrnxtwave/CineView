import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './Auth'
import { PreferencesProvider } from './Preferences'
import { WatchlistProvider } from './Watchlist'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PreferencesProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </PreferencesProvider>
    </AuthProvider>
  </StrictMode>,
)