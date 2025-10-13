import type { ReactNode } from 'react';
import type { ButtonProps, Size } from '@/types';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  size?: Size;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  openedByClick?: boolean;
}
