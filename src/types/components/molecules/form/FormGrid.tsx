import type { IformField } from '@/types';

export interface FormGridProps {
  fields: IformField[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: unknown) => void;
  columns?: 1 | 2;
}
