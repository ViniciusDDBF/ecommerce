import type { Dispatch, SetStateAction } from 'react';
import type { IformField } from '@/types';

export interface useFormParams {
  fields: IformField[];
  initialValues: Record<string, unknown>;
}

export interface useFormReturn {
  values: Record<string, unknown | string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Record<string, unknown>, replace?: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  resetToInitial: () => void;
}
