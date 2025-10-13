import type { Review } from '@/types';

export interface ReviewHeaderProps {
  onClose: () => void;
  isMobile?: boolean;
  review: Pick<Review, 'created_at' | 'rating'> & {
    customer: Pick<Review['customer'], 'first_name'>;
  };
}
