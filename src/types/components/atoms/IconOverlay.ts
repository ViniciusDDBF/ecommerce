import type { MouseEventHandler, ReactNode } from 'react';

export interface IconOverlayProps {
  [key: string]: unknown;
  count?: number;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  showBadge?: boolean;
}
