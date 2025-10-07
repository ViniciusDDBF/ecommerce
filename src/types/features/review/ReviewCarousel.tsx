import type { IReview } from '../../../types';

export interface ReviewCarouselProps {
  className?: string;
  reviews: IReview[];
  openReviewModal: (
    review: IReview,
    mediaIndex: number,
    fromCarousel?: boolean,
  ) => void;
}
