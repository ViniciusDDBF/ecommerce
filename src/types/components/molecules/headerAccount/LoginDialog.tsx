import type { IformField, useFormReturn } from '@/types';

export interface LoginDialogProps {
  isOpen: boolean;
  fields: IformField[];
  loginForm: useFormReturn;
  handleSubmitLogin: () => void;
  isLoading: boolean;
  onSwitchToSignUp: () => void;
  onClose: () => void;
}
