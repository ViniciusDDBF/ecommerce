import type { IFormField, AddressData, CrudFormMode } from '../../../../types';

export interface AddressFormDialogProps {
  isOpen: boolean;
  mode: Omit<CrudFormMode, 'delete'>;
  fields: IFormField[];
  initialValues?: Partial<AddressData>;
  onSubmit: (values: Partial<AddressData>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}
