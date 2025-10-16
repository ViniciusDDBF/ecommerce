import type { Dispatch, SetStateAction } from 'react';
import type { FormFieldConfig } from '@/types';

export type UseForm = UseFormParams;

export interface UseFormParams {
  fields: FormFieldConfig[];
  initialValues: Record<string, unknown>;
}

export interface UseFormReturn<T> {
  errors: Record<string, string>;
  isSubmitting: boolean;
  reset: () => void;
  resetToInitial: () => void;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Partial<T>, replace?: boolean) => void;
  validate: () => boolean;
  values: T;
}
