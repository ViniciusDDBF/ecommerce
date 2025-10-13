import type {
  ComponentPropsWithoutRef,
  Loading,
  ReactNode,
  Selected,
  Size,
  Text,
} from '@/types';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

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

export interface SpinnerLoaderProps {
  color: string;
  size: Size | 'full';
}

export interface GetButtonVariantStylesParams {
  selected?: Selected;
  variant: ButtonVariant;
}

export interface ButtonVariantStyles {
  active: string;
  base: string;
  focus: string;
  hover: string;
  loaderColor: string;
}
