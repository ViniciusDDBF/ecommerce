import type { ReactNode } from 'react';
import type { ButtonProps, Size } from '@/types';

export interface ModalProps {
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  icon?: ReactNode;
  isOpen: boolean;
  message: string;
  openedByClick?: boolean;
  size?: Size;
  title: string;
}
