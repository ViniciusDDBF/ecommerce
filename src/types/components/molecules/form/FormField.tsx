import type { MaskType } from '@/types';

interface ValidationRules {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: unknown) => string | null;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: ValidationRules;
  colSpan?: 1 | 2;
  className?: string;
  applyMask?: MaskType;
  helper?: { text: string; value?: string };
  confirmField?: string;
  disabled?: boolean;
}

export interface FormFieldProps<T = string | number | boolean> {
  field: FormFieldConfig;
  value: T;
  error?: string;
  onChange: (value: T) => void;
}
