import type { Ireview, IreviewState } from '@/types';

export interface ReviewCardProps {
  currentPage: number;
  totalPages: number;
  reviews: Ireview[];
  getReviewState: (id: number) => IreviewState;
  updateReviewState: (id: number, updates: Partial<IreviewState>) => void;
  openReviewModal: (review: Ireview, index: number) => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onSortBy: (sort: string) => void;
}
