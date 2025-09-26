import { ZoomIn, CirclePlay } from 'lucide-react';
import type { Media, Review } from '../ReviewSection';

interface MediaThumbnailsProps {
  media: Media[];
  review: Review;
  onMediaClick: (index: number) => void;
  currentIndex?: number; // For modal
  className?: string;
}

export const MediaThumbnails = ({
  media,
  review,
  onMediaClick,
  currentIndex,
  className = '',
}: MediaThumbnailsProps) => (
  <div className={`flex justify-center ${className}`}>
    <div className="grid max-w-sm grid-cols-3 gap-3">
      {media.map((item, index) => (
        <div
          key={item.id}
          className="group relative cursor-pointer"
          onClick={() => onMediaClick(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onMediaClick(index)}
          aria-label={`View ${item.media_type || 'image'}: Review media ${index + 1}`}
        >
          <div className="bg-charcoal-700 aspect-square overflow-hidden rounded-lg">
            {item.media_type === 'video' ? (
              <video
                src={item.url}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                muted
                controls={false}
                preload="metadata"
              />
            ) : (
              <img
                src={item.url}
                alt={`Review media ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-charcoal-800/80 flex h-8 w-8 items-center justify-center rounded-full opacity-0 transition-all duration-300 group-hover:opacity-100">
                {item.media_type === 'video' ? (
                  <CirclePlay className="text-ember-400 h-4 w-4" />
                ) : (
                  <ZoomIn className="text-charcoal-200 h-4 w-4" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
