import type { FormFieldConfig, useFormReturn } from '@/types';

export interface SignUpDialogProps<T> {
  fields: FormFieldConfig[];
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  signUpForm: useFormReturn<T>;
}
