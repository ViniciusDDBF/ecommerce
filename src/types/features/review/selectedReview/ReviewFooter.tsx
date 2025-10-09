import type { IreviewState } from '@/types';

export interface ReviewFooterProps {
  reviewId: number;
  reviewState: IreviewState;
  onLike: (id: number) => void;
  onDislike: (id: number) => void;
  error?: string;
}
