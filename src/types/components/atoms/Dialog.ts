import type { ButtonProps, ReactNode, TSize } from '@/types';

export interface DialogProps {
  scrollLock?: boolean;
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
