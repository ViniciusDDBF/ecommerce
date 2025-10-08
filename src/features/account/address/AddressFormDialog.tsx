import type { AddressFormDialogProps, FC } from '@/types';
import { useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import { Dialog } from '@/components/atoms';
import { FormGrid } from '@/components/molecules';
import { useForm } from '@/hooks';

export const AddressFormDialog: FC<AddressFormDialogProps> = ({
  mode,
  isOpen,
  fields,
  initialValues,
  onSubmit,
  onClose,
  isLoading,
}) => {
  const form = useForm({ fields, initialValues });

  useEffect(() => {
    if (initialValues) {
      form.setValuesAll(initialValues);
    }
  }, [initialValues, form.setValuesAll]);

  const handleSubmit = async () => {
    if (!form.validate()) return;
    await onSubmit(form.values);
    form.reset();
  };

  return (
    <Dialog
      buttons={{
        cancel: {
          text: 'Close',
          onClick: onClose,
        },
        confirm: {
          text: mode === 'create' ? 'Create Address' : 'Update Address',
          onClick: handleSubmit,
          loading: isLoading,
        },
      }}
      description={
        mode === 'create'
          ? 'Add a new delivery address'
          : 'Update your address information'
      }
      icon={<Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />}
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      size="xl"
      title={mode === 'create' ? 'Create Address' : 'Edit Address'}
    >
      <FormGrid
        columns={1}
        errors={form.errors}
        fields={fields}
        onChange={form.setValue}
        values={form.values}
      />
    </Dialog>
  );
};
