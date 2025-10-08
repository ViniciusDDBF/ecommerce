import type { IRatingSummary, IReview } from '@/types';

export interface ReviewsProps {
  reviews: IReview[];
  isLoggedIn: boolean;
  ratingSummary: IRatingSummary;
  productId: number;
}
