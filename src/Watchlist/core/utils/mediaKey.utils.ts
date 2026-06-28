import type { MediaType } from '../types/Watchlist.types'

export const getMediaKey = (mediaType: MediaType, mediaId: number): string =>
  `${mediaType}:${mediaId}`