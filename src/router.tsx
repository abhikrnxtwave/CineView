import { createBrowserRouter } from 'react-router-dom'
import { LoginPage } from './Auth'
import { ProtectedRoute } from './Auth/ui/components/ProtectedRoute'
import { GuestOnlyRoute } from './Auth/ui/components/GuestOnlyRoute'
import { ShellLayout } from './Common'
import { appRoutes } from './routes/routeConfig'
import { RoutePlaceholderPage } from './pages/RoutePlaceholderPage'
import { NotFoundPage } from './pages/NotFoundPage'

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
      ...appRoutes.map((config) => ({
        path: config.path,
        element: <RoutePlaceholderPage config={config} />,
      })),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])