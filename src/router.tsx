import { createBrowserRouter } from 'react-router-dom'
import { appRoutes } from './routes/routeConfig'
import { RoutePlaceholderPage } from './pages/RoutePlaceholderPage'
import { NotFoundPage } from './pages/NotFoundPage'

export const router = createBrowserRouter([
  ...appRoutes.map((config) => ({
    path: config.path,
    element: <RoutePlaceholderPage config={config} />,
  })),
  { path: '*', element: <NotFoundPage /> },
])