import type { ReactNode } from 'react';

export interface LoadingDivProps {
  [key: string]: unknown;
  children?: ReactNode;
  loader?: boolean;
}
