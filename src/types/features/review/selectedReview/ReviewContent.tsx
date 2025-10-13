import type { Review } from '@/types';

export interface ReviewContentProps {
  review: Pick<Review, 'title' | 'content'>;
}
