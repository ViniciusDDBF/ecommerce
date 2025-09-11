import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import Dialog from './Dialog';
import FormGrid from './form/FormGrid';
import { useForm } from '../hooks/useForm';
import type { FormFieldProps } from '../hooks/useForm';

const FormDialogExample = () => {
  const [showDialog, setShowDialog] = useState(false);

  const fields: FormFieldProps[] = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      validation: { required: true },

      placeholder: 'Enter full name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validation: { required: true },

      placeholder: 'Enter email address',
    },
    {
      name: 'role',
      label: 'Role',
      placeholder: 'Select your role',
      type: 'select',
      colSpan: 2,
      options: [
        { value: 'admin', label: 'Administrator' },
        { value: 'editor', label: 'Editor' },
        { value: 'viewer', label: 'Viewer' },
      ],
      validation: { required: true },
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      colSpan: 2,
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
    },
  ];

  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    setValue,
    validate,
    reset,
  } = useForm(fields);

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowDialog(false);
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button onClick={() => setShowDialog(true)}>Add User</button>

      <Dialog
        isOpen={showDialog}
        title="Add New User"
        description="Fill out the form below to create a new user account"
        icon={<UserPlus />}
        size="lg"
        onClose={() => setShowDialog(false)}
        buttons={{
          cancel: {
            text: 'Cancel',
            onClick: () => setShowDialog(false),
          },
          confirm: {
            text: isSubmitting ? 'Creating...' : 'Create User',
            onClick: handleSubmit,
            props: { loading: isSubmitting },
          },
        }}
      >
        <FormGrid
          fields={fields}
          values={values}
          errors={errors}
          onChange={setValue}
          columns={2}
        />
      </Dialog>
    </>
  );
};

export default FormDialogExample;
