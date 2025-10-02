import { type MaskType } from '../Common';

interface Validation {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: any) => string | null;
}

export interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: Validation;
  colSpan?: 1 | 2;
  className?: string;
  applyMask?: MaskType;
  helper?: { text: string; value?: string };
  confirmField?: string;
  disabled?: boolean;
}
