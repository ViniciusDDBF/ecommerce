import type {
  Classname,
  Disabled,
  Label,
  MaskType,
  Placeholder,
  Value,
} from '@/types';

export interface FormFieldConfig {
  applyMask?: MaskType;
  className?: Classname;
  colSpan?: 1 | 2;
  confirmField?: string;
  disabled?: Disabled;
  helper?: { text: string; value?: string };
  label: Label;
  name: string;
  options?: { value: Value; label: Label }[];
  placeholder?: Placeholder;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  validation?: ValidationRules;
}

export interface FormFieldProps<T = string | number | boolean> {
  error?: string;
  field: FormFieldConfig;
  onChange: (value: T) => void;
  value: T;
}

interface ValidationRules {
  custom?: (value: unknown) => string | null;
  maxLength?: number;
  minLength?: number;
  required?: boolean;
}
