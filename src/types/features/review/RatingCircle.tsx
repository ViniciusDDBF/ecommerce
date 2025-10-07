import type { HTMLAttributes } from 'react';

export interface RatingCircleProps extends HTMLAttributes<HTMLDivElement> {
  review_count: number;
  average: number;
  className: string;
}
