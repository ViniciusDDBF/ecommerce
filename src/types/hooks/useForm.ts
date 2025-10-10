import type { Dispatch, SetStateAction } from 'react';
import type { IformField } from '@/types';

export interface useFormParams {
  fields: IformField[];
  initialValues: Record<string, unknown>;
}

export interface useFormReturn {
  values: Record<string, unknown>;
  errors: Record<string, unknown>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Record<string, unknown>, replace?: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  resetToInitial: () => void;
}

export interface useFormReturn {
  values: Record<string, unknown>;
  errors: Record<string, unknown>;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  setValue: (name: string, value: unknown) => void;
  setValuesAll: (newValues: Record<string, unknown>, replace?: boolean) => void;
  validate: () => boolean;
  reset: () => void;
  resetToInitial: () => void;
}

export type Tlog<Message, Level = 'info'> = {
  message: Message;
  level: Level;
  
};

type TexplicitDebugLog = Tlog<'explicit debug', 'debug'>;
type ImplicitInfo = Tlog<'implicit info'>;