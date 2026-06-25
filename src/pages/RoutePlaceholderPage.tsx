
import { useParams } from 'react-router-dom'
import { PlaceholderPage } from '../components/PlaceholderPage'
import type { RouteConfig } from '../routes/routeConfig'

type Props = { config: RouteConfig }

export const RoutePlaceholderPage = ({ config }: Props) => {
  const params = useParams()
  const description = config.getDescription?.(params as Record<string, string | undefined>)

  return <PlaceholderPage title={config.title} description={description} />
}