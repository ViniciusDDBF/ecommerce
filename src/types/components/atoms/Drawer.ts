import type { ReactNode, TPositionX } from '@/types';

export interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  position?: TPositionX;
  className?: string;
}
