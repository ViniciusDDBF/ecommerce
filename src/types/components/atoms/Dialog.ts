import type { ButtonProps, ReactNode, Size } from '@/types';

export interface DialogProps {
  scrollLock?: boolean;
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
