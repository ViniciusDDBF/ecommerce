import type { ReactNode } from '@/types';

export interface HelperProps {
  onClick?: (value: unknown) => void;
  tooltip: ReactNode | string;
  value: React.ReactNode | string;
}
