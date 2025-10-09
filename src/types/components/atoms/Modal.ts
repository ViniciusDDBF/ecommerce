import type { ReactNode } from 'react';
import type { ButtonProps, Tsize } from '@/types';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: ReactNode;
  size?: Tsize;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  openedByClick?: boolean;
}
