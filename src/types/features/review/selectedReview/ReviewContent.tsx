import type { Ireview } from '@/types';

export interface ReviewContentProps {
  review: Pick<Ireview, 'title' | 'content'>;
}
