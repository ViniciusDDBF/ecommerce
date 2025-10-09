import type { Dispatch, SetStateAction } from 'react';
import type { IformField } from '@/types';

export interface useFormParams<T> {
  fields: IformField[];
  initialValues: T;
}

export interface useFormReturn<T> {
  values: T;
  errors: Record<string, string>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: T, replace?: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  resetToInitial: () => void;
}
