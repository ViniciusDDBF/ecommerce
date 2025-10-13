import type { HTMLAttributes } from 'react';

export interface RatingCircleProps extends HTMLAttributes<HTMLDivElement> {
  average: number;
  className: string;
  review_count: number;
}
