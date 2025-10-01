import type { ButtonProps } from './Button';

export interface DialogProps {
  ScrollLock?: boolean;
  isOpen: boolean;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  buttons?: {
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
  };
  onClose?: () => void;
  openedByClick?: boolean;
}
