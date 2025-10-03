import type { ReviewState } from '../ReviewCard';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '../../../components/atoms';

interface ReviewFooterProps {
  reviewId: number;
  reviewState: ReviewState;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  error?: string;
}

export const ReviewFooter: React.FC<ReviewFooterProps> = ({
  reviewId,
  reviewState,
  onLike,
  onDislike,
  error,
}) => {
  return (
    <div className="border-charcoal-600 border-t p-4">
      <div className="flex justify-between gap-2 px-4">
        <Button
          startIcon={<ThumbsUp className="h-4 w-4" />}
          text={`Helpful (${reviewState.positiveVotes})`}
          variant={reviewState.hasLiked ? 'secondary' : 'outline'}
          disabled={reviewState.hasLiked || reviewState.hasDisliked}
          onClick={() => onLike(reviewId)}
        />
        <Button
          startIcon={<ThumbsDown className="h-4 w-4" />}
          text={`Not Helpful (${reviewState.negativeVotes})`}
          variant={reviewState.hasDisliked ? 'secondary' : 'outline'}
          disabled={reviewState.hasLiked || reviewState.hasDisliked}
          onClick={() => onDislike(reviewId)}
        />
      </div>
      {error && (
        <p className="text-ember-500 mt-2 text-center text-sm">{error}</p>
      )}
    </div>
  );
};
