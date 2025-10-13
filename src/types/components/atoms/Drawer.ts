import type { PositionX, ReactNode } from '@/types';

export interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  position?: PositionX;
  className?: string;
}
