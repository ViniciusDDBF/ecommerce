import type { ReviewState } from '@/types';

export interface ReviewFooterProps {
  error?: string;
  onDislike: (id: number) => void;
  onLike: (id: number) => void;
  reviewId: number;
  reviewState: ReviewState;
}
