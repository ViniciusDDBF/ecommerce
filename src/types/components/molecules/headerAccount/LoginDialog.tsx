import type { FormFieldConfig, useFormReturn } from '@/types';

export interface LoginDialogProps {
  isOpen: boolean;
  fields: FormFieldConfig[];
  loginForm: useFormReturn;
  handleSubmitLogin: () => void;
  isLoading: boolean;
  onSwitchToSignUp: () => void;
  onClose: () => void;
}
