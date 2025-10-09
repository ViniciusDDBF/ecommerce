import type { Ireview } from '@/types';

export interface ReviewCarouselProps {
  className?: string;
  reviews: Ireview[];
  openReviewModal: (
    review: Ireview,
    mediaIndex: number,
    fromCarousel?: boolean,
  ) => void;
}
