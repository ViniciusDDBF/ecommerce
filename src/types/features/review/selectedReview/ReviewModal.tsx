import type { Review, ReviewState } from '@/types';

export interface ReviewModalProps {
  closeReviewModal: () => void;
  currentMediaIndex: number;
  error?: string;
  getReviewState: (id: number) => ReviewState;
  handleDislikeClick: (id: number) => void;
  handleLikeClick: (id: number) => void;
  isCarouselMode: boolean;
  navigateMedia: (direction: 'next' | 'prev') => void;
  selectedReview: Review | null;
  setCurrentMediaIndex: (index: number) => void;
}
