import type { Media } from '../../features/review/Reviews';
import { CirclePlay } from 'lucide-react';

interface MediaThumbnailsProps {
  mediaList: Array<Media>;
  currentIndex: number;
  onSelect: (index: number) => void;
}

export const MediaThumbnails: React.FC<MediaThumbnailsProps> = ({
  mediaList,
  currentIndex,
  onSelect,
}) => {
  if (mediaList.length <= 1) return null;

  return (
    <div className="grid grid-cols-4 gap-2">
      {mediaList.map((media, index) => (
        <button
          key={media.id}
          onClick={() => onSelect(index)}
          className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
            index === currentIndex
              ? 'border-ember-400'
              : 'hover:border-charcoal-500 border-transparent'
          }`}
        >
          {media.media_type === 'image' ? (
            <img
              src={media.url}
              alt={`Media ${index + 1}`}
              className={`h-full w-full object-cover ${index === currentIndex ? '' : 'cursor-pointer'}`}
            />
          ) : (
            <div className="relative size-full">
              <div className="absolute inset-0 flex items-center justify-center">
                <CirclePlay
                  fill="black"
                  fillOpacity={0.3}
                  className="text-ember-400 h-6 w-6 rounded-full"
                />
              </div>
              <video
                src={media.url}
                className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-110"
                muted
                controls={false}
                preload="metadata"
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};
