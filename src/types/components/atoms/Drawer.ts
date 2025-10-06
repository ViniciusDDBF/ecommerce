import { ReactNode } from 'react';
import type { PositionX } from '../../../types';

export interface DrawerProps {
  isOpen: boolean;
  children?: ReactNode;
  position?: PositionX;
  className?: string;
}
