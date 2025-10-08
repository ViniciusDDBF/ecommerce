import type { Dispatch, SetStateAction } from 'react';
import type { IFormField } from '@/types';

export interface useFormParams {
  fields: IFormField[];
  initialValues: Record<string, any>;
}

export interface useFormReturn {
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
