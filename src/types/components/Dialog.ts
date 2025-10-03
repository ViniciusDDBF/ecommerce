import type { ButtonProps, Size } from '../../types';
import type { ReactNode } from 'react';

interface ModalButtons {
  cancel?: {
    text: string;
    onClick?: () => void;
    props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
  };
  confirm?: {
    text: string;
    onClick?: () => void;
    props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
  };
}

export interface DialogProps {
  ScrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  size?: Size;
  children: ReactNode;
  buttons?: ModalButtons;
  onClose?: () => void;
  openedByClick?: boolean;
}
