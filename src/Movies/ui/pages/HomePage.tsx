import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrailerModal } from '../../../Common'
import { ContentRow } from '../components/ContentRow'
import { GenreFilter } from '../components/GenreFilter'
import { HeroBanner } from '../components/HeroBanner'
import { useHomeController } from '../controllers/useHomeController'

export const HomePage = () => {
  const navigate = useNavigate()
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const {
    heroMovie,
    heroStatus,
    genres,
    genreStatus,
    activeGenreId,
    setActiveGenreId,
    trending,
    popular,
    topRated,
    upcoming,
    filtered,
    playHeroTrailer,
  } = useHomeController()

  const goToMovie = (id: number) => navigate(`/movies/${id}`)

  const handlePlayTrailer = async () => {
    const key = await playHeroTrailer()
    if (key) {
      setTrailerKey(key)
      setTrailerOpen(true)
    }
  }

  return (
    <div className="pb-10">
      <HeroBanner movie={heroMovie} status={heroStatus} onPlayTrailer={handlePlayTrailer} />

      <GenreFilter
        genres={genres}
        activeGenreId={activeGenreId}
        status={genreStatus}
        onSelect={setActiveGenreId}
      />

      {activeGenreId !== null ? (
        <ContentRow title="Filtered Results" items={filtered.items} status={filtered.status} onCardClick={goToMovie} />
      ) : (
        <>
          <ContentRow title="Trending" items={trending.items} status={trending.status} onCardClick={goToMovie} />
          <ContentRow title="Popular" items={popular.items} status={popular.status} onCardClick={goToMovie} />
          <ContentRow title="Top Rated" items={topRated.items} status={topRated.status} onCardClick={goToMovie} />
          <ContentRow title="Upcoming" items={upcoming.items} status={upcoming.status} onCardClick={goToMovie} />
        </>
      )}

      <TrailerModal
        isOpen={trailerOpen}
        videoKey={trailerKey}
        title={heroMovie?.title ?? 'Trailer'}
        onClose={() => setTrailerOpen(false)}
      />
    </div>
  )
}