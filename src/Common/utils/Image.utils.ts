import { TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZES } from '../core/constants/Tmdb.constants'

type ImageKind = keyof typeof TMDB_IMAGE_SIZES

export const getTmdbImageUrl = (
  path: string | null | undefined,
  kind: ImageKind = 'poster',
): string | null => {
  if (!path) return null
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZES[kind]}${path}`
}