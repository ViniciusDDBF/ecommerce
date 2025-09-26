import { X } from 'lucide-react';
import type { Review } from '../ReviewSection';
import { UserMiniProfile } from './userMiniProfile';
import { RatingStars } from './RatingStars';
import { ExpandableContent } from './ExpandableContent';
import { MediaThumbnails } from './MediaThumbnail';
import { useReviewState } from '../../hooks/useReviewState';
import { useVoting } from '../../hooks/useVoting';
import Button from '../Button';

interface ModalReviewDetailsProps {
  review: Review;
  currentMediaIndex: number;
  isLoggedIn: boolean;
  onClose: () => void;
  onMediaClick: (index: number) => void;
}

export const ModalReviewDetails = ({
  review,
  currentMediaIndex,
  isLoggedIn,
  onClose,
  onMediaClick,
}: ModalReviewDetailsProps) => {
  const { getState, updateState } = useReviewState([review]);
  const { handleVote, error, clearError } = useVoting({
    isLoggedIn,
    onError: () => {}, // Adapt error handling as needed
  });

  const state = getState(review.id);

  const handleLike = async () => {
    const result = await handleVote(
      review.id,
      'like',
      state.positiveVotes,
      state.hasLiked || state.hasDisliked,
    );
    if (result?.success) {
      updateState(review.id, {
        positiveVotes: result.newCount,
        hasLiked: true,
        hasDisliked: false,
      });
    }
  };

  const handleDislike = async () => {
    const result = await handleVote(
      review.id,
      'dislike',
      state.negativeVotes,
      state.hasLiked || state.hasDisliked,
    );
    if (result?.success) {
      updateState(review.id, {
        negativeVotes: result.newCount,
        hasLiked: false,
        hasDisliked: true,
      });
    }
  };

  return (
    <div className="bg-charcoal-800 border-charcoal-600 fixed top-0 right-0 z-30 flex h-full w-96 flex-col overflow-hidden border-l">
      {/* Header */}
      <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
        <div className="flex flex-col gap-5">
          <UserMiniProfile review={review} />
          <RatingStars rating={review.rating} />
        </div>
        <Button
          variant="ghost"
          size="xs"
          startIcon={<X className="text-charcoal-200 h-4 w-4 sm:h-5 sm:w-5" />}
          onClick={onClose}
          aria-label="Close modal"
          className="p-2"
        />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <ExpandableContent
          title={review.title}
          content={review.content}
          isExpanded={true} // Always expanded in modal
          onToggle={() => {}} // No toggle in modal
        />
        {review.media.length > 1 && (
          <MediaThumbnails
            media={review.media}
            review={review}
            onMediaClick={onMediaClick}
            currentIndex={currentMediaIndex}
            className="grid grid-cols-4 gap-2"
          />
        )}
      </div>

      {/* Footer - Vote Buttons */}
      <div className="border-charcoal-600 border-t p-4">
        <VoteButtons
          positiveVotes={state.positiveVotes}
          negativeVotes={state.negativeVotes}
          hasVoted={state.hasLiked || state.hasDisliked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        {error && (
          <p className="text-ember-500 mt-2 text-center text-sm">{error}</p>
        )}
      </div>
    </div>
  );
};
