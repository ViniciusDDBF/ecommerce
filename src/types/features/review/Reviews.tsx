import type { IReview, IRatingSummary } from '../../../types';

export interface ReviewsProps {
  reviews: IReview[];
  isLoggedIn: boolean;
  ratingSummary: IRatingSummary;
  productId: number;
}
