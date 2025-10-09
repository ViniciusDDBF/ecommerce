import type { Iaddress, IformField, TcrudFormMode } from '@/types';

export interface AddressFormDialogProps {
  isOpen: boolean;
  mode: Omit<TcrudFormMode, 'delete'>;
  fields: IformField[];
  initialValues: Partial<Iaddress>;
  onSubmit: (values: Partial<Iaddress>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}
