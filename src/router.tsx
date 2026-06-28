import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './Auth'
import { ProtectedRoute } from './Auth/ui/components/ProtectedRoute'
import { GuestOnlyRoute } from './Auth/ui/components/GuestOnlyRoute'
import { ShellLayout } from './Common'
import { NotFoundPage } from './pages/NotFoundPage'
import { HomePage, MovieDetailPage } from './Movies'
import { SearchPage } from './Search/ui/pages/SearchPage'
import { TVShowLayout, TVShowDetailPage, SeasonDetailPage } from './TVShows'
import { RoutePlaceholderPage } from './pages/RoutePlaceholderPage'
import { appRoutes } from './routes/routeConfig'
import { SettingsPage } from './Preferences/ui/pages/SettingsPage'


export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <GuestOnlyRoute>
        <LoginPage />
      </GuestOnlyRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <ShellLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/search', element: <SearchPage /> },
      { path: '/movies/:id', element: <MovieDetailPage /> },
      { path: '/settings', element: <SettingsPage /> },
      {
        path: '/tv/:id',
        element: <TVShowLayout />,
        children: [
          { index: true, element: <TVShowDetailPage /> },
          { path: 'season/:seasonNumber', element: <SeasonDetailPage /> },
        ],
      },
      // Keep placeholders for M5/M6 routes
      ...appRoutes
        .filter((r) => !['/', '/search', '/movies/:id', '/tv/:id', '/tv/:id/season/:seasonNumber', '/settings'].includes(r.path))
        .map((config) => ({
          path: config.path,
          element: <RoutePlaceholderPage config={config} />,
        })),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])