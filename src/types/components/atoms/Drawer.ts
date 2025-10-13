import type { PositionX, ReactNode } from '@/types';

export interface DrawerProps {
  children?: ReactNode;
  className?: string;
  isOpen: boolean;
  position?: PositionX;
}
