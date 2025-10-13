import type { Review, ReviewState } from '@/types';

export interface ReviewModalProps {
  selectedReview: Review | null;
  currentMediaIndex: number;
  getReviewState: (id: number) => ReviewState;
  setCurrentMediaIndex: (index: number) => void;
  navigateMedia: (direction: 'next' | 'prev') => void;
  closeReviewModal: () => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  isCarouselMode: boolean;
  error?: string;
}
