import type {
  ComponentPropsWithoutRef,
  Loading,
  ReactNode,
  Selected,
  Size,
  Text,
} from '@/types';

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<'button'>, 'children'> {
  endIcon?: ReactNode;
  loading?: Loading;
  onClick: () => void;
  selected?: Selected;
  size?: Size | 'full';
  startIcon?: ReactNode;
  text?: Text;
  variant?: ButtonVariant;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface ButtonVariantStyles {
  active: string;
  base: string;
  focus: string;
  hover: string;
  loaderColor: string;
}

export interface GetButtonVariantStylesParams {
  selected?: Selected;
  variant: ButtonVariant;
}

export interface SpinnerLoaderProps {
  color: string;
  size: Size | 'full';
}
