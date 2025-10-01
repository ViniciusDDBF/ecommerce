import type { ReactNode } from 'react';
import type { Size } from '../Common';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text?: string | ReactNode;
  variant?: ButtonVariant;
  size?: Size;
  loading?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface SpinnerLoaderProps {
  size: Size;
  color: string;
}

export interface GetVariantStylesParams {
  variant: ButtonVariant;
  selected?: boolean;
}

/**
 * Style classes for button variant states
 */
export interface VariantStyles {
  base: string;
  hover: string;
  active: string;
  focus: string;
  loaderColor: string;
}
