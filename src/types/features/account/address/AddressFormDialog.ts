import type { CrudFormMode, FormFieldConfig, Iaddress } from '@/types';

export interface AddressFormDialogProps {
  isOpen: boolean;
  mode: Omit<CrudFormMode, 'delete'>;
  fields: FormFieldConfig[];
  initialValues: Partial<Iaddress>;
  onSubmit: (values: Partial<Iaddress>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}
