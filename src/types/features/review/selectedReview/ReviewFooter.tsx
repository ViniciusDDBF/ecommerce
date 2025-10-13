import type { ReviewState } from '@/types';

export interface ReviewFooterProps {
  reviewId: number;
  reviewState: ReviewState;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  error?: string;
}
