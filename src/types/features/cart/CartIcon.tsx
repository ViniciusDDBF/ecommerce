import type { MouseEventHandler } from 'react';

export interface CartIconProps {
  count?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
