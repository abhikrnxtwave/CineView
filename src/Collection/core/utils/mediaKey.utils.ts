import type { MediaType } from '../types/Collection.types'

export const getMediaKey = (mediaType: MediaType, mediaId: number): string =>
  `${mediaType}:${mediaId}`