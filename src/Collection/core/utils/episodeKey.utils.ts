export const getEpisodeKey = (
    showId: number,
    seasonNumber: number,
    episodeNumber: number,
  ): string => `${showId}:${seasonNumber}:${episodeNumber}`
  
  export const parseEpisodeKey = (key: string) => {
    const [showId, seasonNumber, episodeNumber] = key.split(':').map(Number)
    return { showId, seasonNumber, episodeNumber }
  }