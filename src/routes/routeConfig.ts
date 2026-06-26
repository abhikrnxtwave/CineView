export type RouteConfig = {
  path: string
  title: string
  getDescription?: (params: Record<string, string | undefined>) => string
}

export const appRoutes: RouteConfig[] = [
  { path: '/', title: 'Home' },
  { path: '/search', title: 'Search' },
  {
    path: '/movies/:id',
    title: 'Movie Detail',
    getDescription: ({ id }) => `Movie ID: ${id}`,
  },
  {
    path: '/tv/:id',
    title: 'TV Show Detail',
    getDescription: ({ id }) => `Show ID: ${id}`,
  },
  {
    path: '/tv/:id/season/:seasonNumber',
    title: 'Season Detail',
    getDescription: ({ id, seasonNumber }) =>
      `Show ID: ${id}, Season: ${seasonNumber}`,
  },
  { path: '/watchlist', title: 'Watchlist' },
  { path: '/lists', title: 'My Lists' },
  {
    path: '/lists/:listId',
    title: 'List Detail',
    getDescription: ({ listId }) => `List ID: ${listId}`,
  },
  { path: '/settings', title: 'Settings' },
]