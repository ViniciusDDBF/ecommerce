import type { Review } from '../ReviewSection';
import { UserMiniProfile } from './userMiniProfile';
import { RatingStars } from './RatingStars';
import { ExpandableContent } from './ExpandableContent';
import { MediaThumbnails } from './MediaThumbnail';
import { VoteButtons } from './VoteButton';
import { useReviewState } from '../../hooks/useReviewState';
import { useVoting } from '../../hooks/useVoting';

interface ReviewCardProps {
  review: Review;
  isLoggedIn: boolean;
  onOpenModal: (review: Review, index: number) => void;
}

export const ReviewCard = ({
  review,
  isLoggedIn,
  onOpenModal,
}: ReviewCardProps) => {
  const { getState, updateState } = useReviewState([review]); // Pass single review for isolation
  const { handleVote, error, clearError } = useVoting({
    isLoggedIn,
    onError: () => {},
  }); // Adapt error handling

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

  const handleToggleExpand = () =>
    updateState(review.id, { isExpanded: !state.isExpanded });

  const handleMediaClick = (index: number) => onOpenModal(review, index);

  return (
    <div className="bg-charcoal-600/80 border-charcoal-400/10 rounded-xl border p-6 backdrop-blur-md md:p-8">
      <div className="border-charcoal-700/50 mb-6 flex items-start justify-between border-b pb-4">
        <UserMiniProfile review={review} />
        <RatingStars rating={review.rating} />
      </div>
      <div className="space-y-6">
        <ExpandableContent
          title={review.title}
          content={review.content}
          isExpanded={state.isExpanded}
          onToggle={handleToggleExpand}
        />
        {review.media.length > 0 && (
          <MediaThumbnails
            media={review.media}
            review={review}
            onMediaClick={handleMediaClick}
          />
        )}
        <VoteButtons
          positiveVotes={state.positiveVotes}
          negativeVotes={state.negativeVotes}
          hasVoted={state.hasLiked || state.hasDisliked}
          onLike={handleLike}
          onDislike={handleDislike}
        />
        {error && <p className="text-ember-500 text-center text-sm">{error}</p>}
      </div>
    </div>
  );
};
