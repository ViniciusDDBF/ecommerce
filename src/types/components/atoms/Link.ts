import type { ReactNode, CSSProperties, AnchorHTMLAttributes } from 'react';
import type { TSize, TButtonVariant } from '../../../types';

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
