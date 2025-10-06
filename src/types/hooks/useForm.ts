import type { MaskType } from '../../types';
import type { Dispatch, SetStateAction } from 'react';

export interface ValidationProps {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  custom?: (value: string) => string | undefined;
}

export interface FormFieldProps {
  name: string;
  type?: 'text' | 'email' | 'password' | 'checkbox' | string;
  label?: string;
  applyMask?: MaskType;
  confirmField?: string;
  validation?: ValidationProps;
}

export interface UseFormReturn {
  values: Record<string, any>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: any) => void;
  setValuesAll: (newValues: Record<string, any>, replace?: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  resetToInitial: () => void;
}
