import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Review } from '../ReviewSection';

interface ModalMediaViewerProps {
  review: Review;
  currentIndex: number;
  onNavigate: (direction: 'prev' | 'next') => void;
}

export const ModalMediaViewer = ({
  review,
  currentIndex,
  onNavigate,
}: ModalMediaViewerProps) => {
  if (!review.media.length) return null;

  const media = review.media[currentIndex];
  const isVideo = media.media_type === 'video';

  return (
    <div className="pointer-events-auto relative max-h-full max-w-4xl">
      {isVideo ? (
        <video
          src={media.url}
          controls
          autoPlay
          className="h-[90vh] w-[90vh] rounded-lg shadow-2xl"
        />
      ) : (
        <img
          src={media.url}
          alt={`Review media ${currentIndex + 1}`}
          className="h-[90vh] w-[90vh] rounded-lg object-contain shadow-2xl"
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        />
      )}
      {review.media.length > 1 && (
        <>
          <button
            onClick={() => onNavigate('prev')}
            className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70"
            aria-label="Previous media"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={() => onNavigate('next')}
            className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70"
            aria-label="Next media"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
    </div>
  );
};
