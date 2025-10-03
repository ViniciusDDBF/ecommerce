import type { ReactNode } from 'react';

export interface IconOverlayProps {
  icon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  count?: number;
  showBadge?: boolean;
  [key: string]: any;
}
