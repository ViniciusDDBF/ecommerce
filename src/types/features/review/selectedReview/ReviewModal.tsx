import type { IReview, IReviewState } from '../../../../types';

export interface ReviewModalProps {
  selectedReview: IReview | null;
  currentMediaIndex: number;
  getReviewState: (id: number) => IReviewState;
  setCurrentMediaIndex: (index: number) => void;
  navigateMedia: (direction: 'next' | 'prev') => void;
  closeReviewModal: () => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  isCarouselMode: boolean;
  error?: string;
}
