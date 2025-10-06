import type { ButtonProps, Size } from '../../../types';
import type { ReactNode } from 'react';

export interface DialogProps {
  ScrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  size?: Size;
  children: ReactNode;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  onClose?: () => void;
  openedByClick?: boolean;
}
