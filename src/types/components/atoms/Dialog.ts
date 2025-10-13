import type { ButtonProps, ReactNode, Size } from '@/types';

export interface DialogProps {
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  children: ReactNode;
  description?: string;
  icon?: ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  openedByClick?: boolean;
  scrollLock?: boolean;
  size?: Size;
  title: string;
}
