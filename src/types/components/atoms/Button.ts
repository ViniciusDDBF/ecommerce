import type { ReactNode, ComponentPropsWithoutRef } from 'react';
import type { Size } from '../../../types';

export type TButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  onClick: () => void;
  text?: string | ReactNode;
  variant?: TButtonVariant;
  size?: Size | 'full';
  loading?: boolean;
  selected?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

export interface SpinnerLoaderProps {
  size: Size | 'full';
  color: string;
}

export interface GetVariantStylesParams {
  variant: TButtonVariant;
  selected?: boolean;
}

export interface IVariantStyles {
  base: string;
  hover: string;
  active: string;
  focus: string;
  loaderColor: string;
}
