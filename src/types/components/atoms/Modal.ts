import type { Size, ButtonProps } from '../../../types';
import type { ReactNode } from 'react';

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
