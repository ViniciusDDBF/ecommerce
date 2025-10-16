import type { Dispatch, SetStateAction } from 'react';
import type { FormFieldConfig } from '@/types';

export type useForm = useFormParams;

export interface useFormParams {
  fields: FormFieldConfig[];
  initialValues: Record<string, unknown>;
}

export interface useFormReturn<T> {
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
