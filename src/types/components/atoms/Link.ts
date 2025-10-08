import type { AnchorHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { TButtonVariant, TSize } from '@/types';

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  text?: string | ReactNode;
  variant?: TButtonVariant;
  size?: TSize;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: CSSProperties;
}
