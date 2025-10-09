import type { ReactNode } from 'react';

export interface LoadingDivProps {
  loader?: boolean;
  children?: ReactNode;
  [key: string]: unknown;
}
