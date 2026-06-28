import { getTmdbImageUrl } from '../../../utils/Image.utils'

type PosterImageProps = {
  path: string | null | undefined
  alt: string
  className?: string
  size?: 'poster' | 'posterLarge' | 'backdrop' | 'profile'
}

export const PosterImage = ({
  path,
  alt,
  className = '',
  size = 'poster',
}: PosterImageProps) => {
  const src = getTmdbImageUrl(path, size)

  if (!src) {
    return (
      <div className={`flex items-center justify-center bg-zinc-800 text-zinc-500 ${className}`}>
        <span className="text-xs">No image</span>
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} loading="lazy" />
}