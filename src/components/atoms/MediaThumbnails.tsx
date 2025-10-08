import type { FC, IMedia, MediaThumbnailNavigationProps } from '@/types';
import { CirclePlay } from 'lucide-react';

export const MediaThumbnails: FC<MediaThumbnailNavigationProps> = ({
  mediaList,
  selected,
  onSelect,
  selectionMode = 'object',
  layout = 'vertical',
  maxThumbnails,
  className = '',
  thumbnailSize = 'medium',
}) => {
  const effectiveList = maxThumbnails
    ? mediaList.slice(0, maxThumbnails)
    : mediaList;

  if (effectiveList.length <= 1) return null;

  const handleSelect = (item: IMedia, index: number) => {
    onSelect(selectionMode === 'index' ? index : item);
  };

  const sizeClasses = {
    xm: 'h-12 w-16',
    sm: 'size-16',
    md: 'size-20',
    lg: 'size-24',
    xl: 'h-28 w-36',
  }[thumbnailSize];

  let containerClasses = `gap-2 sm:gap-3 md:gap-4 ${className}`;
  if (layout === 'horizontal') {
    containerClasses += ' flex overflow-x-auto';
  } else if (layout === 'vertical') {
    containerClasses += ' flex flex-col ';
  }

  return (
    <div className={containerClasses}>
      {effectiveList.map((item, index) => {
        const isSelected =
          typeof selected === 'number'
            ? selected === index
            : selected?.url === item.url;
        const isVideo = item.media_type === 'video';

        const commonClasses = `${sizeClasses} cursor-pointer rounded-lg border-2 object-cover aspect-square transition-all duration-200 ${
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
            className={`group relative overflow-hidden`}
          >
            {isVideo ? (
              <div className="relative">
                {playIcon}
                <video
                  src={item.url}
                  className={`${commonClasses}`}
                  muted
                  controls={false}
                  preload="metadata"
                />
              </div>
            ) : (
              <img src={item.url} className={`${commonClasses} `} />
            )}
          </button>
        );
      })}
    </div>
  );
};
