import type { IformField, useFormReturn } from '@/types';

export interface SignUpDialogProps {
  isOpen: boolean;
  fields: IformField[];
  signUpForm: useFormReturn;
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  onSwitchToLogin: () => void;
  onClose: () => void;
}
