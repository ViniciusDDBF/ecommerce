import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { TButtonVariant, Tsize } from '@/types';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  text?: string | ReactNode;
  variant?: TButtonVariant;
  size?: Tsize;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: CSSProperties;
}
