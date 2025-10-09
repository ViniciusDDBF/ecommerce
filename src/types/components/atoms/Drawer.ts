import type { ReactNode, TpositionX } from '@/types';

export interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  position?: TpositionX;
  className?: string;
}
