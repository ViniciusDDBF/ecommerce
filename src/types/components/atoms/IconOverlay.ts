import type { MouseEventHandler, ReactNode } from 'react';

export interface IconOverlayProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon?: ReactNode;
  count?: number;
  showBadge?: boolean;
  [key: string]: unknown;
}
