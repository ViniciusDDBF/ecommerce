import type { RatingSummary, Review } from '@/types';

export interface ReviewsProps {
  isLoggedIn: boolean;
  productId: number;
  ratingSummary: RatingSummary;
  reviews: Review[];
}
