import type { RatingSummary, Review } from '@/types';

export interface ReviewsProps {
  reviews: Review[];
  isLoggedIn: boolean;
  ratingSummary: RatingSummary;
  productId: number;
}
