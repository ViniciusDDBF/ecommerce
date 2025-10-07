import type { IReview } from '../../../../types';

export interface ReviewHeaderProps {
  onClose: () => void;
  isMobile?: boolean;
  review: Pick<IReview, 'created_at' | 'rating'> & {
    customer: Pick<IReview['customer'], 'first_name'>;
  };
}
