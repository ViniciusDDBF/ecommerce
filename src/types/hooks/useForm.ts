import type { Dispatch, SetStateAction } from 'react';
import type { FormFieldConfig } from '@/types';

export interface useFormParams {
  fields: FormFieldConfig[];
  initialValues: Record<string, unknown>;
}

export interface useFormReturn {
  errors: Record<string, string>;
  isSubmitting: boolean;
  reset: () => void;
  resetToInitial: () => void;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Record<string, unknown>, replace?: boolean) => void;
  validate: () => boolean;
  values: Record<string, unknown>;
}

export interface useFormReturn {
  errors: Record<string, string>;
  isSubmitting: boolean;
  reset: () => void;
  resetToInitial: () => void;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Record<string, unknown>, replace?: boolean) => void;
  validate: () => boolean;
  values: Record<string, unknown>;
}

export type Tlog<Message, Level = 'info'> = {
  message: Message;
  level: Level;
};
