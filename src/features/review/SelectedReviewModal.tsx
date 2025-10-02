import { type Review } from './ReviewSection';
import { type ReviewState } from './ReviewCard';
import {
  Shield,
  Star,
  CirclePlay,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { Button, Overlay } from '../../components/atoms';

interface ReviewModalProps {
  selectedReview: Review | null;
  currentMediaIndex: number;
  getReviewState: (id: number) => ReviewState;
  setCurrentMediaIndex: (index: number) => void;
  navigateMedia: (direction: 'next' | 'prev') => void;
  closeReviewModal: () => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  isCarouselMode: boolean;
  error?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
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
  if (!selectedReview) return null;

  return (
    <Overlay onClick={closeReviewModal} isOpen={selectedReview !== null}>
      {/* ---------- Main div ---------- */}
      <div
        className={`animate-slide-up custom-scroll-y pointer-events-none fixed inset-0 z-30 flex flex-col overflow-y-auto md:flex-row md:items-center md:justify-center md:overflow-hidden md:p-6 md:pr-0`}
      >
        {/* ---------- Media Section ---------- */}
        {selectedReview.media.length > 0 && (
          <div className="pointer-events-none relative h-[90vh] w-full md:mr-96 md:mb-0 md:flex md:h-auto md:max-h-[90vh] md:max-w-[calc(100vw-24rem)] md:flex-shrink-0 md:justify-center">
            {selectedReview.media[currentMediaIndex].media_type === 'video' ? (
              <video
                src={selectedReview.media[currentMediaIndex].url}
                controls
                className="pointer-events-auto h-[90vh] w-[90vh] object-contain md:size-fit md:max-w-[50vw] md:rounded-lg"
                autoPlay
              />
            ) : (
              <img
                src={selectedReview.media[currentMediaIndex].url}
                alt={`Review media ${currentMediaIndex + 1}`}
                className="pointer-events-auto h-[90vh] object-contain md:rounded-lg"
              />
            )}
            {/* ---------- Media navigation buttons ---------- */}

            {(selectedReview.media.length > 1 || isCarouselMode) && (
              <div className="pointer-events-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  startIcon={<ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />}
                  onClick={() => navigateMedia('prev')}
                  className="absolute top-1/2 left-2 -translate-y-1/2"
                  aria-label="Previous media"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  startIcon={<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />}
                  onClick={() => navigateMedia('next')}
                  className="absolute top-1/2 right-2 mr-6 -translate-y-1/2"
                  aria-label="Next media"
                />
              </div>
            )}
            {/* ---------- Close button / MOBILE ---------- */}
            <Button
              variant="secondary"
              startIcon={<X className="h-5 w-5" />}
              onClick={closeReviewModal}
              aria-label="Close modal"
              className="pointer-events-auto absolute top-4 right-4 md:hidden"
            />
          </div>
        )}
        {/* ---------- Review Details Section ---------- */}
        <div className="bg-charcoal-800 border-charcoal-600 pointer-events-auto flex h-fit w-full flex-col md:fixed md:top-0 md:right-0 md:min-h-screen md:w-96 md:overflow-hidden md:border-l">
          {/* ---------- Header ---------- */}
          <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-charcoal-700 flex h-10 w-10 items-center justify-center rounded-full md:h-12 md:w-12">
                  <span className="text-ember-400 text-base font-bold md:text-lg">
                    {selectedReview.is_anonymous
                      ? 'AN'
                      : `${selectedReview.customer.first_name?.[0] || ''}${selectedReview.customer.last_name?.[0] || ''}`}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">
                      {selectedReview.is_anonymous
                        ? 'Anonymous'
                        : selectedReview.customer.first_name}
                    </span>
                    <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                      <Shield className="mr-1 h-2.5 w-2.5" />
                      Verified
                    </span>
                  </div>
                  <p className="text-charcoal-300 text-sm">
                    {new Date(selectedReview.created_at).toLocaleDateString(
                      'en-US',
                      {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 md:h-5 md:w-5 ${
                        star <= selectedReview.rating
                          ? 'fill-ember-400 text-ember-400'
                          : 'text-charcoal-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-charcoal-300 text-sm font-medium">
                  {selectedReview.rating.toFixed(1)}
                </span>
              </div>
            </div>
            {/* ---------- Close button ---------- */}
            <Button
              variant="outline"
              size="xs"
              startIcon={
                <X className="text-charcoal-200 h-4 w-4 md:h-5 md:w-5" />
              }
              onClick={closeReviewModal}
              aria-label="Close modal"
            />
          </div>
          {/* ---------- Review Content ---------- */}
          <div className="custom-scroll-y flex-1 space-y-4 p-4">
            <h3 className="text-lg leading-tight font-bold break-words text-white md:text-xl">
              {selectedReview.title}
            </h3>
            <p className="text-charcoal-300 md:custom-scroll-y flex text-sm leading-relaxed break-words md:h-[55vh] md:overflow-auto">
              {selectedReview.content}
            </p>
            {selectedReview.media.length > 1 && (
              <div>
                <div className="grid grid-cols-4 gap-2">
                  {selectedReview.media.map((media, index) => (
                    <button
                      key={media.id}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                        index === currentMediaIndex
                          ? 'border-ember-400'
                          : 'hover:border-charcoal-500 border-transparent'
                      }`}
                    >
                      {media.media_type === 'image' ? (
                        <img
                          src={media.url}
                          alt={`Media ${index + 1}`}
                          className={`h-full w-full object-cover ${index === currentMediaIndex ? '' : 'cursor-pointer'}`}
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
              </div>
            )}
          </div>
          {/* ---------- Footer and vote buttons ---------- */}
          <div className="border-charcoal-600 border-t p-4">
            <div className="flex justify-between gap-2 px-4">
              <Button
                startIcon={<ThumbsUp className="h-4 w-4" />}
                text={`Helpful (${getReviewState(selectedReview.id).positiveVotes})`}
                variant={
                  getReviewState(selectedReview.id).hasLiked
                    ? 'secondary'
                    : 'outline'
                }
                disabled={
                  getReviewState(selectedReview.id).hasLiked ||
                  getReviewState(selectedReview.id).hasDisliked
                }
                onClick={() => handleLikeClick(selectedReview.id)}
              />
              <Button
                startIcon={<ThumbsDown className="h-4 w-4" />}
                text={`Not Helpful (${getReviewState(selectedReview.id).negativeVotes})`}
                variant={
                  getReviewState(selectedReview.id).hasDisliked
                    ? 'secondary'
                    : 'outline'
                }
                disabled={
                  getReviewState(selectedReview.id).hasLiked ||
                  getReviewState(selectedReview.id).hasDisliked
                }
                onClick={() => handleDislikeClick(selectedReview.id)}
              />
            </div>
            {error && (
              <p className="text-ember-500 mt-2 text-center text-sm">{error}</p>
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};
