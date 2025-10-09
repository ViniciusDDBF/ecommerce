import type { ButtonProps, ReactNode, Tsize } from '@/types';

export interface DialogProps {
  scrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: ReactNode;
  size?: Tsize;
  children: ReactNode;
  buttons: {
    cancel: ButtonProps;
    confirm?: ButtonProps;
  };
  onClose?: () => void;
  openedByClick?: boolean;
}
