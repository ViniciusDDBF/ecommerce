import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { ButtonVariant, Size } from '@/types';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  disabled?: boolean;
  endIcon?: ReactNode;
  selected?: boolean;
  size?: Size;
  startIcon?: ReactNode;
  style?: CSSProperties;
  text?: string | ReactNode;
  variant?: ButtonVariant;
}
