import type { ReactNode } from 'react';
import type { ButtonProps, TSize } from '@/types';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  size?: TSize;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  openedByClick?: boolean;
}
