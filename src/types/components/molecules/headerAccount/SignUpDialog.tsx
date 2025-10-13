import type { FormFieldConfig, useFormReturn } from '@/types';

export interface SignUpDialogProps {
  fields: FormFieldConfig[];
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  signUpForm: useFormReturn;
}
