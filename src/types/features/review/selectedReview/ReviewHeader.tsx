import type { Ireview } from '@/types';

export interface ReviewHeaderProps {
  onClose: () => void;
  isMobile?: boolean;
  review: Pick<Ireview, 'created_at' | 'rating'> & {
    customer: Pick<Ireview['customer'], 'first_name'>;
  };
}
