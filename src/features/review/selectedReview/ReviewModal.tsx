import type { FC, ReviewModalProps } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import {
  Button,
  MediaFullDisplay,
  MediaMainDisplay,
  MediaNavigationButtons,
  MediaThumbnails,
  Overlay,
} from '@/components/atoms';
import { ReviewContent, ReviewFooter, ReviewHeader } from '@/features';

export const ReviewModal: FC<ReviewModalProps> = ({
  selectedReview,
  currentMediaIndex,
  getReviewState,
  setCurrentMediaIndex,
  navigateMedia,
  closeReviewModal,
  handleLikeClick,
  handleDislikeClick,
  isCarouselMode,
  error,
}) => {
  const [fullMediaOpen, setFullMediaOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleImageClick = () => setFullMediaOpen(true);
  const handleFullMediaClose = () => setFullMediaOpen(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  if (!selectedReview) return null;
  const hasNavigation = selectedReview.media.length > 1 || isCarouselMode;
  const currentMedia = selectedReview.media[currentMediaIndex];
  const reviewState = getReviewState(selectedReview.id);
  return (
    <>
      <Overlay isOpen={selectedReview !== null} onClick={closeReviewModal} />
      {!fullMediaOpen && (
        <div
          ref={scrollRef}
          className={`animate-slide-up custom-scroll-y pointer-events-none fixed inset-0 z-30 flex items-start justify-center overflow-y-auto p-2 md:items-center md:p-6 md:pt-4`}
        >
          <div
            className={`bg-charcoal-800 border-charcoal-600 pointer-events-auto flex w-full max-w-md flex-col rounded-lg md:max-h-[90vh] md:w-auto md:max-w-7xl md:flex-row md:overflow-hidden ${
              selectedReview.media.length === 0 ? 'md:max-w-lg' : ''
            }`}
          >
            {/* Media Section */}
            {selectedReview.media.length > 0 && (
              <div className="relative flex min-h-[30vh] w-full items-center md:mb-0 md:h-auto md:max-h-[90vh] md:min-h-[auto] md:flex-1 md:flex-row md:items-center md:justify-center">
                <MediaNavigationButtons
                  hasNavigation={hasNavigation}
                  onNext={() => navigateMedia('next')}
                  onPrev={() => navigateMedia('prev')}
                />
                <MediaMainDisplay
                  index={currentMediaIndex}
                  media={currentMedia}
                  onImageClick={handleImageClick}
                />
                {/* Mobile close button */}
                <Button
                  aria-label="Close modal"
                  className="absolute top-4 right-4 md:hidden"
                  onClick={closeReviewModal}
                  size="xs"
                  startIcon={<X className="h-5 w-5" />}
                  variant="secondary"
                />
              </div>
            )}
            {/* Review Details Section */}
            <div className="flex w-full flex-col md:w-96 md:overflow-hidden">
              <ReviewHeader
                onClose={closeReviewModal}
                review={selectedReview}
              />
              <div className="custom-scroll-y min-h-[33vh] flex-1 overflow-y-auto p-4">
                <ReviewContent review={selectedReview} />
                <MediaThumbnails
                  gridColumns={3}
                  layout="horizontal"
                  maxThumbnails={3}
                  mediaList={selectedReview.media}
                  onSelect={(e) => {
                    if (typeof e === 'number') {
                      setCurrentMediaIndex(e);
                    }
                  }}
                  selected={currentMediaIndex}
                  selectionMode="index"
                />
              </div>
              <ReviewFooter
                error={error}
                onDislike={handleDislikeClick}
                onLike={handleLikeClick}
                reviewId={selectedReview.id}
                reviewState={reviewState}
              />
            </div>
          </div>
        </div>
      )}

      <MediaFullDisplay
        alt={`Full screen review media ${currentMediaIndex + 1}`}
        isOpen={fullMediaOpen}
        mediaUrl={currentMedia?.url || ''}
        onClose={handleFullMediaClose}
      />
    </>
  );
};
