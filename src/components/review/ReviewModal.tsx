import { X } from 'lucide-react';
import Overlay from '../Overlay';
import { ModalMediaViewer } from './ModalMediaViewer';
import { ModalReviewDetails } from './ModalReviewDetails';
import { useModalNavigation } from '../../hooks/useModalNavigation';
import type { Review } from '../ReviewSection';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  review: Review;
  isLoggedIn: boolean;
}

export const ReviewModal = ({
  isOpen,
  onClose,
  review,
  isLoggedIn,
}: ReviewModalProps) => {
  const { currentMediaIndex, navigateMedia } = useModalNavigation(review);

  if (!isOpen) return null;

  return (
    <Overlay onClick={onClose} isOpen={isOpen}>
      <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center p-4 pr-96">
        <ModalMediaViewer
          review={review}
          currentIndex={currentMediaIndex}
          onNavigate={navigateMedia}
        />
      </div>
      <div className="bg-charcoal-800 border-charcoal-600 fixed top-0 right-0 z-30 flex h-full w-96 flex-col overflow-hidden border-l">
        {/* Header with UserProfile + close button */}
        {/* Scrollable content with ExpandableContent + MediaThumbnails */}
        {/* Footer with VoteButtons */}
      </div>
    </Overlay>
  );
};
