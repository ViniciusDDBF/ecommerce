import type { FormFieldConfig, useFormReturn } from '@/types';

export interface LoginDialogProps<T> {
  fields: FormFieldConfig[];
  handleSubmitLogin: () => void;
  isLoading: boolean;
  isOpen: boolean;
  loginForm: useFormReturn<T>;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}
