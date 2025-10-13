import type { Review } from '@/types';

export interface ReviewCarouselProps {
  className?: string;
  reviews: Review[];
  openReviewModal: (
    review: Review,
    mediaIndex: number,
    fromCarousel?: boolean,
  ) => void;
}
