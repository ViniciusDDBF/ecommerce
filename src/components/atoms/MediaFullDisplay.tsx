import type { FC, FullMediaViewerProps } from '@/types';
import { X } from 'lucide-react';
import { Button, Overlay } from '@/components/atoms';

export const MediaFullDisplay: FC<FullMediaViewerProps> = ({
  mediaUrl,
  alt,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Overlay isOpen={true} onClick={onClose} />
      <div className="bg-charcoal-900/90 pointer-events-auto fixed inset-0 z-40 flex items-center justify-center">
        <img alt={alt} className="size-full object-contain" src={mediaUrl} />
        <Button
          aria-label="Close full media"
          className="absolute top-6 right-6"
          onClick={onClose}
          size="xs"
          startIcon={<X className="h-5 w-5" />}
          variant="secondary"
        />
      </div>
    </>
  );
};
