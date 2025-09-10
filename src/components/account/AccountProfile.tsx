import { Edit2 } from 'lucide-react';
import Button from '../Button';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { useForm } from '../../hooks/useForm';
import type { FormFieldProps as FormFieldType } from '../../hooks/useForm';
import FormGrid from '../form/FormGrid';
import { useState } from 'react';
import Dialog from '../Dialog';
import { useAppDispatch } from '../../store/hooks/hooks';
import {
  ThunkUpdateUser,
  type UpdateCustomerInterface,
} from '../../store/slices/userSlice';

const editUserFieldsDisplay: FormFieldType[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    colSpan: 2,
    validation: { required: true },
    disabled: true,
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your Last name',
    colSpan: 2,
    validation: { required: true },
    disabled: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    colSpan: 2,
    applyMask: 'phone',
    validation: { required: true },
    disabled: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
    disabled: true,
  },
];

const editUserFields: FormFieldType[] = [
  {
    name: 'first_name',
    label: 'First Name',
    type: 'text',
    placeholder: 'Enter your first name',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'last_name',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Enter your Last name',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'text',
    placeholder: 'Enter your phone number',
    colSpan: 2,
    applyMask: 'phone',
    validation: { required: true },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
    colSpan: 2,
    validation: { required: true },
    disabled: true,
  },
];

export default function AccountProfile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const userDisplay = useForm(editUserFieldsDisplay, {
    first_name: user.user?.first_name,
    last_name: user.user?.last_name,
    email: user.user?.email,
    phone: user.user?.phone,
  });
  const [isOpen, setIsOpen] = useState(false);
  const editUser = useForm(editUserFields, {
    first_name: user.user?.first_name,
    last_name: user.user?.last_name,
    email: user.user?.email,
    phone: user.user?.phone,
  });
  const userInitials =
    (user.user?.first_name?.[0] ?? '') + (user.user?.last_name?.[0] ?? '');

  const handleUpdateUser = async () => {
    if (!user.user?.user_id) return;
    const fullPayload = { ...editUser.values, user_id: user.user.user_id };
    try {
      await dispatch(ThunkUpdateUser(fullPayload as UpdateCustomerInterface));
      userDisplay.setValuesAll(editUser.values);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="from-ember-400 to-ember-600 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br text-2xl font-bold text-amber-50">
              {userInitials}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-ember-400 mb-1 text-2xl font-bold">
              {user.user?.first_name} {user.user?.last_name}
            </h2>
            <p className="text-charcoal-300 mb-3">{user.user?.email}</p>
            <div className="flex space-x-3"></div>
          </div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="glass-effect flex flex-col gap-10 rounded-xl p-6">
        <FormGrid
          fields={editUserFieldsDisplay}
          values={userDisplay.values}
          errors={userDisplay.errors}
          onChange={userDisplay.setValue}
          columns={2}
        />
        <div className="flex w-[100%] justify-end">
          <Button
            text="Edit Profile"
            variant="secondary"
            size="md"
            startIcon={<Edit2 size={16} />}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>

      {/* signup as CPF dialog */}
      <Dialog
        title="Edit your informations"
        isOpen={isOpen}
        description="Create your account"
        size="lg"
        icon={<Edit2 />}
        onClose={() => setIsOpen(false)} // ✅ Correct
        buttons={{
          cancel: {
            text: 'Close',
            onClick: () => setIsOpen(false),
          },
          confirm: {
            text: editUser.isSubmitting ? 'Creating...' : 'Save alterations',
            onClick: handleUpdateUser,
            props: { loading: user.isLoading },
          },
        }}
      >
        <FormGrid
          fields={editUserFields}
          values={editUser.values}
          errors={editUser.errors}
          onChange={editUser.setValue}
          columns={2}
        />
      </Dialog>
    </div>
  );
}
