import type { ButtonProps } from './Button';

export interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  buttons: {
    cancel: {
      text: string;
      onClick?: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
    confirm?: {
      text: string;
      onClick: () => void;
      props?: Partial<Omit<ButtonProps, 'text' | 'onClick'>>;
    };
  };
  openedByClick?: boolean;
}
