import type { Review } from '@/types';

export interface ReviewCarouselProps {
  className?: string;
  openReviewModal: (
    review: Review,
    mediaIndex: number,
    fromCarousel?: boolean,
  ) => void;
  reviews: Review[];
}
