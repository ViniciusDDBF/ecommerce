import type { ReactNode, MouseEventHandler } from 'react';

export interface IconOverlayProps {
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  count?: number;
  showBadge?: boolean;
  [key: string]: any;
}
