import type { IFormField, useFormReturn } from '../../../../types';

export interface LoginDialogProps {
  isOpen: boolean;
  fields: IFormField[];
  loginForm: useFormReturn;
  handleSubmitLogin: () => void;
  isLoading: boolean;
  onSwitchToSignUp: () => void;
  onClose: () => void;
}
