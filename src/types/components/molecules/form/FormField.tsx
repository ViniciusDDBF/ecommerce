import type { TmaskType } from '@/types';

interface Ivalidation {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: unknown) => string | null;
}

export interface IformField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: Ivalidation;
  colSpan?: 1 | 2;
  className?: string;
  applyMask?: TmaskType;
  helper?: { text: string; value?: string };
  confirmField?: string;
  disabled?: boolean;
}

export interface FormFieldProps<T = string | number | boolean> {
  field: IformField;
  value: T;
  error?: string;
  onChange: (value: T) => void;
}
