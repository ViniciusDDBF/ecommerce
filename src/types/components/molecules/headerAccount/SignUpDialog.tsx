import type { IFormField, useFormReturn } from '../../../../types';
import {} from '../../../hooks/useForm';

export interface SignUpDialogProps {
  isOpen: boolean;
  fields: IFormField[];
  signUpForm: useFormReturn;
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  onSwitchToLogin: () => void;
  onClose: () => void;
}
