import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './Auth'
import { PreferencesProvider } from './Preferences'
import { CollectionProvider } from './Collection'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PreferencesProvider>
        <CollectionProvider>
          <App />
        </CollectionProvider>
      </PreferencesProvider>
    </AuthProvider>
  </StrictMode>,
)