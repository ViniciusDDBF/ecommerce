import type { FormFieldConfig, useFormReturn } from '@/types';

export interface SignUpDialogProps {
  isOpen: boolean;
  fields: FormFieldConfig[];
  signUpForm: useFormReturn;
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  onSwitchToLogin: () => void;
  onClose: () => void;
}
