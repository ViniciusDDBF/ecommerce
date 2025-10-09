import type { Ireview, IreviewState } from '@/types';

export interface ReviewModalProps {
  selectedReview: Ireview | null;
  currentMediaIndex: number;
  getReviewState: (id: number) => IreviewState;
  setCurrentMediaIndex: (index: number) => void;
  navigateMedia: (direction: 'next' | 'prev') => void;
  closeReviewModal: () => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  isCarouselMode: boolean;
  error?: string;
}
