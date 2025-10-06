import { IFormField } from './FormField';

export interface FormGridProps {
  fields: IFormField[];
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
  columns?: 1 | 2;
}
