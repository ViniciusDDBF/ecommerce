import type { IReview } from '../../../../types';

export interface ReviewContentProps {
  review: Pick<IReview, 'title' | 'content'>;
}
