import type { ReactNode } from 'react';
type ButtonVariant = 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  text?: string | ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: React.CSSProperties;
}
