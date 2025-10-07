import type { ButtonProps, TSize, ReactNode } from '../../../types';

export interface DialogProps {
  ScrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  size?: TSize;
  children: ReactNode;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  onClose?: () => void;
  openedByClick?: boolean;
}
