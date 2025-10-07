import type { FullMediaViewerProps, FC } from '../../types';
import { X } from 'lucide-react';
import { Button, Overlay } from '.';

export const MediaFullDisplay: FC<FullMediaViewerProps> = ({
  mediaUrl,
  alt,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} isOpen={true}>
      <div className="bg-charcoal-900/90 pointer-events-auto fixed inset-0 z-40 flex items-center justify-center">
        <img src={mediaUrl} alt={alt} className="size-full object-contain" />
        <Button
          variant="secondary"
          size="xs"
          startIcon={<X className="h-5 w-5" />}
          onClick={onClose}
          aria-label="Close full media"
          className="absolute top-6 right-6"
        />
      </div>
    </Overlay>
  );
};
