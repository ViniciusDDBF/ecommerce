import type { TSize, ButtonProps } from '../../../types';
import type { ReactNode } from 'react';

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
