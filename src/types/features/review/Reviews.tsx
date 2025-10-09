import type { IratingSummary, Ireview } from '@/types';

export interface ReviewsProps {
  reviews: Ireview[];
  isLoggedIn: boolean;
  ratingSummary: IratingSummary;
  productId: number;
}
