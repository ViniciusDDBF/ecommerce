import type { IReview, IReviewState } from '../../../../types';

export interface ReviewFooterProps {
  reviewId: number;
  reviewState: IReviewState;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  error?: string;
}
