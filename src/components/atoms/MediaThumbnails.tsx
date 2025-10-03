import type { Media } from '../../features/review/Reviews';
import { CirclePlay } from 'lucide-react';

interface MediaThumbnailsProps {
  mediaList: Array<Media>;
  currentIndex: number;
  onSelect: (index: number) => void;
  direction?: 'horizontal' | 'vertical';
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
}

export const MediaThumbnails: React.FC<MediaThumbnailsProps> = ({
  mediaList,
  currentIndex,
  onSelect,
  direction = 'horizontal',
  maxThumbnails,
  gridColumns = 4,
  className,
}) => {
  const effectiveList = maxThumbnails
    ? mediaList.slice(0, maxThumbnails)
    : mediaList;

  if (effectiveList.length <= 1) return null;

  return (
    <div
      style={{
        gridTemplateColumns:
          direction === 'vertical'
            ? undefined
            : `repeat(${gridColumns}, minmax(0, 1fr))`,
        gridTemplateRows:
          direction === 'vertical'
            ? `repeat(${gridColumns}, minmax(0, 1fr))`
            : undefined,
      }}
      className={`grid gap-2 ${className}`}
    >
      {effectiveList.map((media, index) => (
        <button
          key={media.id}
          onClick={() => onSelect(index)}
          className={`group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
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
