import type { IFormField } from '../../../../types';
import { UseFormReturn } from '../../../hooks/useForm';

export interface LoginDialogProps {
  isOpen: boolean;
  fields: IFormField[];
  loginForm: UseFormReturn;
  handleSubmitLogin: () => void;
  isLoading: boolean;
  onSwitchToSignUp: () => void;
  onClose: () => void;
}
