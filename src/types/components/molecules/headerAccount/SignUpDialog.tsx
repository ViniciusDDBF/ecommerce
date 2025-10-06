import type { IFormField } from '../../../../types';
import { UseFormReturn } from '../../../hooks/useForm';

export interface SignUpDialogProps {
  isOpen: boolean;
  fields: IFormField[];
  signUpForm: UseFormReturn;
  handleSubmitSignUp: () => void;
  isLoading: boolean;
  onSwitchToLogin: () => void;
  onClose: () => void;
}
