import type { Review, ReviewState } from '@/types';

export interface ReviewCardProps {
  currentPage: number;
  getReviewState: (id: number) => ReviewState;
  handleDislikeClick: (id: number) => void;
  handleLikeClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onSortBy: (sort: string) => void;
  openReviewModal: (review: Review, index: number) => void;
  reviews: Review[];
  totalPages: number;
  updateReviewState: (id: number, updates: Partial<ReviewState>) => void;
}
