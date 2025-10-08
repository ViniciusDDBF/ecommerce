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
          className="max-h-full max-w-full rounded-lg object-contain"
          controls
          src={media.url}
        >
          <track kind="captions" label="No captions available" />
        </video>
      ) : (
        <button
          className={`flex h-full w-full ${onImageClick ? 'cursor-pointer' : null} items-center justify-center`}
          onClick={onImageClick}
          type="button"
        >
          <img
            alt={`Review media ${index + 1}`}
            className="max-h-full max-w-full rounded-lg object-contain"
            src={media.url}
          />
        </button>
      )}
    </div>
  );
};
