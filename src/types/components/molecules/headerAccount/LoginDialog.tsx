import type { FormFieldConfig, useFormReturn } from '@/types';

export interface LoginDialogProps {
  fields: FormFieldConfig[];
  handleSubmitLogin: () => void;
  isLoading: boolean;
  isOpen: boolean;
  loginForm: useFormReturn;
  onClose: () => void;
  onSwitchToSignUp: () => void;
}
