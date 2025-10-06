import React from 'react';
import { CirclePlay } from 'lucide-react';
import type { ThumbnailNavigationProps } from '../../types';

export const ThumbnailNavigation: React.FC<ThumbnailNavigationProps> = ({
  images,
  selectedMedia,
  setSelectedMedia,
  productName,
  orientation = 'vertical',
}) => {
  const containerClasses = `flex gap-2 sm:gap-3 md:gap-4 ${
    orientation === 'horizontal'
      ? 'overflow-x-auto sm:overflow-visible'
      : 'flex-col w-16 md:w-20 lg:w-24'
  }`;

  return (
    <div className={containerClasses}>
      {images.map((item, idx) => {
        const isSelected = selectedMedia?.url === item.url;
        const isVideo = item.media_type === 'video';

        const commonClasses = `hover:border-ember-500 h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 flex-shrink-0 cursor-pointer rounded-lg border-2 object-contain ${
          isSelected ? 'border-ember-500' : 'border-transparent'
        }`;

        return isVideo ? (
          <div key={idx} className="relative flex-shrink-0">
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <CirclePlay className="text-ember-300 h-6 w-6 opacity-80 sm:h-8 sm:w-8" />
            </div>
            <video
              src={item.url}
              className={commonClasses}
              onClick={() => setSelectedMedia(item)}
              muted
              controls={false}
              preload="metadata"
            />
          </div>
        ) : (
          <img
            key={idx}
            src={item.url}
            className={commonClasses}
            onClick={() => setSelectedMedia(item)}
            alt={`${productName} thumbnail ${idx + 1}`}
          />
        );
      })}
    </div>
  );
};
