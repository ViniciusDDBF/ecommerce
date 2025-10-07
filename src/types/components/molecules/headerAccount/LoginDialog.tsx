import type { IFormField } from '../../../../types';
import { useFormReturn } from '../../../hooks/useForm';

export interface LoginDialogProps {
  isOpen: boolean;
  fields: IFormField[];
  loginForm: useFormReturn;
  handleSubmitLogin: () => void;
  isLoading: boolean;
  onSwitchToSignUp: () => void;
  onClose: () => void;
}
