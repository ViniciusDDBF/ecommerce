import type { IReview, IReviewState } from '../../../../types';

export interface ReviewCardProps {
  currentPage: number;
  totalPages: number;
  reviews: IReview[];
  getReviewState: (id: number) => IReviewState;
  updateReviewState: (id: number, updates: Partial<IReviewState>) => void;
  openReviewModal: (review: IReview, index: number) => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onSortBy: (sort: string) => void;
}
