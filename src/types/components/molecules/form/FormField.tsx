import type { MaskType } from '@/types';

interface ValidationRules {
  custom?: (value: unknown) => string | null;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
}

export interface FormFieldConfig {
  applyMask?: MaskType;
  className?: string;
  colSpan?: 1 | 2;
  confirmField?: string;
  disabled?: boolean;
  helper?: { text: string; value?: string };
  label: string;
  name: string;
  options?: { value: string; label: string }[];
  placeholder?: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  validation?: ValidationRules;
}

export interface FormFieldProps<T = string | number | boolean> {
  error?: string;
  field: FormFieldConfig;
  onChange: (value: T) => void;
  value: T;
}
