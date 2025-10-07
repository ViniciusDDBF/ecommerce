import type { IFormField, AddressData, TCrudFormMode } from '../../../../types';

export interface AddressFormDialogProps {
  isOpen: boolean;
  mode: Omit<TCrudFormMode, 'delete'>;
  fields: IFormField[];
  initialValues: Partial<AddressData>;
  onSubmit: (values: Partial<AddressData>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}
