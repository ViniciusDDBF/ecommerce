import type { FC, MediaDisplayProps } from '@/types';

export const MediaMainDisplay: FC<MediaDisplayProps> = ({
  media,
  index,
  onImageClick,
}) => {
  return (
    <div className="flex h-full w-full items-center">
      {media.media_type === 'video' ? (
        <video
          src={media.url}
          controls
          className="max-h-full max-w-full rounded-lg object-contain"
          autoPlay
        />
      ) : (
        <div
          onClick={onImageClick}
          className={`flex h-full w-full ${onImageClick ? 'cursor-pointer' : null} items-center justify-center`}
        >
          <img
            src={media.url}
            alt={`Review media ${index + 1}`}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      )}
    </div>
  );
};
