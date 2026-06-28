import { createPortal } from 'react-dom'

type Props = {
  isOpen: boolean
  videoKey: string | null
  title: string
  onClose: () => void
}

export const TrailerModal = ({ isOpen, videoKey, title, onClose }: Props) => {
  if (!isOpen || !videoKey) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-4xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-10 right-0 text-sm text-zinc-300 hover:text-white"
        >
          Close
        </button>
        <div className="aspect-video overflow-hidden rounded-xl bg-black">
          <iframe
            title={title}
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            className="h-full w-full"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}