import type { Review, ReviewState } from '@/types';

export interface ReviewCardProps {
  currentPage: number;
  totalPages: number;
  reviews: Review[];
  getReviewState: (id: number) => ReviewState;
  updateReviewState: (id: number, updates: Partial<ReviewState>) => void;
  openReviewModal: (review: Review, index: number) => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onSortBy: (sort: string) => void;
}
