import type { MaskType } from '../../../../types';

interface IValidation {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: any) => string | null;
}

export interface IFormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: IValidation;
  colSpan?: 1 | 2;
  className?: string;
  applyMask?: MaskType;
  helper?: { text: string; value?: string };
  confirmField?: string;
  disabled?: boolean;
}

export interface FormFieldProps {
  field: IFormField;
  value: any;
  error?: string;
  onChange: (value: any) => void;
}
