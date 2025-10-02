import type { FormFieldProps } from '../../../types/hooks';
import type { AddressData } from '../../../store/slices/userSlice';
import { useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import { Dialog } from '../../../components/atoms';
import { FormGrid } from '../../../components/molecules';
import { useForm } from '../../../hooks';

interface AddressFormDialogProps {
  mode: 'create' | 'update';
  isOpen: boolean;
  fields: FormFieldProps[];
  initialValues?: Partial<AddressData>;
  onSubmit: (values: Partial<AddressData>) => Promise<void>;
  onClose: () => void;
  isLoading: boolean;
}

export const AddressFormDialog = ({
  mode,
  isOpen,
  fields,
  initialValues,
  onSubmit,
  onClose,
  isLoading,
}: AddressFormDialogProps) => {
  const form = useForm(fields, initialValues);

  useEffect(() => {
    if (initialValues) {
      form.setValuesAll(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    if (!form.validate()) return;
    await onSubmit(form.values);
    form.reset();
  };

  return (
    <Dialog
      title={mode === 'create' ? 'Create Address' : 'Edit Address'}
      isOpen={isOpen}
      description={
        mode === 'create'
          ? 'Add a new delivery address'
          : 'Update your address information'
      }
      size="xl"
      icon={<Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />}
      onClose={() => {
        form.reset();
        onClose();
      }}
      buttons={{
        cancel: {
          text: 'Close',
          onClick: onClose,
        },
        confirm: {
          text: mode === 'create' ? 'Create Address' : 'Update Address',
          onClick: handleSubmit,
          props: { loading: isLoading },
        },
      }}
    >
      <FormGrid
        fields={fields}
        values={form.values}
        errors={form.errors}
        onChange={form.setValue}
        columns={1}
      />
    </Dialog>
  );
};
