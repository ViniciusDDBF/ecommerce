import React from 'react';
import { CirclePlay } from 'lucide-react';

export interface MediaItem {
  url: string;
  media_type: string;
  id?: string; // Optional for reviews
}

interface MediaThumbnailNavigationProps {
  mediaList: MediaItem[];
  selected?: MediaItem | number | null; // Can be object (product) or index (reviews)
  onSelect: (
    selected: MediaItem | number,
  ) => void | React.Dispatch<React.SetStateAction<MediaItem | null>>;
  selectionMode?: 'object' | 'index'; // Defaults to 'object'
  layout?: 'horizontal' | 'vertical' | 'grid'; // Combines orientation/direction
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
  thumbnailSize?: 'small' | 'medium' | 'large'; // Controls size classes
  getAltText?: (item: MediaItem, index: number) => string; // Custom alt text generator
}

export const MediaThumbnailNavigation: React.FC<
  MediaThumbnailNavigationProps
> = ({
  mediaList,
  selected,
  onSelect,
  selectionMode = 'object',
  layout = 'vertical',
  maxThumbnails,
  gridColumns = 4,
  className = '',
  thumbnailSize = 'medium',
  getAltText = (_, index) => `Media thumbnail ${index + 1}`,
}) => {
  const effectiveList = maxThumbnails
    ? mediaList.slice(0, maxThumbnails)
    : mediaList;

  if (effectiveList.length <= 1) return null;

  const handleSelect = (item: MediaItem, index: number) => {
    onSelect(selectionMode === 'index' ? index : item);
  };

  const sizeClasses = {
    small: 'h-12 w-12 sm:h-16 sm:w-16',
    medium: 'h-16 w-16 md:h-20 md:w-20',
    large: 'h-20 w-20 lg:h-24 lg:w-24',
  }[thumbnailSize];

  let containerClasses = `gap-2 sm:gap-3 md:gap-4 ${className}`;
  if (layout === 'horizontal') {
    containerClasses += ' flex overflow-x-auto';
  } else if (layout === 'vertical') {
    containerClasses += ' flex flex-col w-16 md:w-20 lg:w-24';
  } else if (layout === 'grid') {
    containerClasses = `grid gap-2 ${className}`;
  }

  return (
    <div
      className={containerClasses}
      style={{
        gridTemplateColumns:
          layout === 'grid'
            ? `repeat(${gridColumns}, minmax(0, 1fr))`
            : undefined,
        gridTemplateRows:
          layout === 'vertical' && gridColumns
            ? `repeat(${gridColumns}, minmax(0, 1fr))`
            : undefined,
      }}
    >
      {effectiveList.map((item, index) => {
        const isSelected =
          typeof selected === 'number'
            ? selected === index
            : selected?.url === item.url;
        const isVideo = item.media_type === 'video';

        const commonClasses = `${sizeClasses} flex-shrink-0 cursor-pointer rounded-lg border-2 object-contain transition-all duration-200 ${
          isSelected
            ? 'border-ember-500'
            : 'border-transparent hover:border-ember-500'
        }`;

        const playIcon = (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <CirclePlay className="text-ember-400 h-6 w-6 opacity-80 sm:h-8 sm:w-8" />
          </div>
        );

        return (
          <button
            key={item.id || item.url || index}
            onClick={() => handleSelect(item, index)}
            className={`group relative overflow-hidden ${layout === 'grid' ? 'aspect-square' : ''}`}
          >
            {isVideo ? (
              <div className="relative">
                {playIcon}
                <video
                  src={item.url}
                  className={`${commonClasses} ${layout === 'grid' ? 'h-full w-full object-cover group-hover:scale-110' : ''}`}
                  muted
                  controls={false}
                  preload="metadata"
                />
              </div>
            ) : (
              <img
                src={item.url}
                className={`${commonClasses} ${layout === 'grid' ? 'h-full w-full object-cover' : ''}`}
                alt={getAltText(item, index)}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};
