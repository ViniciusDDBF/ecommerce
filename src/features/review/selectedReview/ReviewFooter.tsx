import type { FC, ReviewFooterProps } from '@/types';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/atoms';

export const ReviewFooter: FC<ReviewFooterProps> = ({
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
          disabled={reviewState.hasLiked || reviewState.hasDisliked}
          onClick={() => onLike(reviewId)}
          startIcon={<ThumbsUp className="h-4 w-4" />}
          text={`Helpful (${reviewState.positiveVotes})`}
          variant={reviewState.hasLiked ? 'secondary' : 'outline'}
        />
        <Button
          disabled={reviewState.hasLiked || reviewState.hasDisliked}
          onClick={() => onDislike(reviewId)}
          startIcon={<ThumbsDown className="h-4 w-4" />}
          text={`Not Helpful (${reviewState.negativeVotes})`}
          variant={reviewState.hasDisliked ? 'secondary' : 'outline'}
        />
      </div>
      {error && (
        <p className="text-ember-500 mt-2 text-center text-sm">{error}</p>
      )}
    </div>
  );
};
