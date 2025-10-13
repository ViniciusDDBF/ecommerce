import type { FormFieldConfig } from '@/types';

export interface FormGridProps {
  columns?: 1 | 2;
  errors: Record<string, string>;
  fields: FormFieldConfig[];
  onChange: (name: string, value: unknown) => void;
  values: Record<string, string>;
}
