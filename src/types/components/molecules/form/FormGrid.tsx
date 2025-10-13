import type { FormFieldConfig } from '@/types';

export interface FormGridProps {
  fields: FormFieldConfig[];
  values: Record<string, string>;
  errors: Record<string, string>;
  onChange: (name: string, value: unknown) => void;
  columns?: 1 | 2;
}
