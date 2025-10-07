import type { IReviewState } from '../../../../types';

export interface ReviewFooterProps {
  reviewId: number;
  reviewState: IReviewState;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  error?: string;
}
