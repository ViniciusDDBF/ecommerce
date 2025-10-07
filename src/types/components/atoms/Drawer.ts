import type { TPositionX, ReactNode } from '../../../types';

export interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  position?: TPositionX;
  className?: string;
}
