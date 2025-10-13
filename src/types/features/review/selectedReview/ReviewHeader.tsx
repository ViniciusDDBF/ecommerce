import type { Review } from '@/types';

export interface ReviewHeaderProps {
  isMobile?: boolean;
  onClose: () => void;
  review: Pick<Review, 'created_at' | 'rating'> & {
    customer: Pick<Review['customer'], 'first_name'>;
  };
}
