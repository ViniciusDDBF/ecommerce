import type { Address, CrudFormMode, FormFieldConfig } from '@/types';

export interface AddressFormDialogProps {
  fields: FormFieldConfig[];
  initialValues: Partial<Address>;
  isLoading: boolean;
  isOpen: boolean;
  mode: Omit<CrudFormMode, 'delete'>;
  onClose: () => void;
  onSubmit: (values: Partial<Address>) => Promise<void>;
}
