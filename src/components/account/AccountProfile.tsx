import { Edit2 } from 'lucide-react';
import Button from '../Button';
import { useForm } from '../../hooks/useForm';
import type { FormFieldProps } from '../../hooks/useForm';
import FormGrid from '../form/FormGrid';
import { useState } from 'react';
import Dialog from '../Dialog';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ThunkUpdateUser, type UserData } from '../../store/slices/userSlice';

const editUserFields: FormFieldProps[] = [
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
    placeholder: 'Enter your last name',
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
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

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
    if (!editUser.validate()) return;
    const userFields = {
      first_name: user.user?.first_name,
      last_name: user.user?.last_name,
      email: user.user?.email,
      phone: user.user?.phone,
    };
    if (!user.user?.user_id) return;
    if (JSON.stringify(userFields) === JSON.stringify(editUser.values)) {
      setIsOpen(false);
      return;
    }
    const fullPayload = { ...editUser.values, user_id: user.user.user_id };
    try {
      await dispatch(ThunkUpdateUser(fullPayload as UserData));
      setIsOpen(false);
    } catch (err) {}
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      {/* ---------- Header Section ---------- */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-12 sm:flex-row sm:items-center">
        <div className="flex-1">
          <h1 className="text-charcoal-50 mb-2 text-2xl font-light sm:mb-3 sm:text-3xl md:text-4xl">
            My Profile
          </h1>
          <div className="bg-ember-500 mb-2 h-1 w-16 rounded-full sm:w-20"></div>
          <p className="text-charcoal-400 text-sm sm:text-base">
            Manage your personal information
          </p>
        </div>
        <Button
          text="Edit Profile"
          variant="secondary"
          size="xs"
          startIcon={<Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />}
          onClick={() => setIsOpen(true)}
          className="w-full sm:w-auto"
        />
      </div>

      {/* ---------- Profile Card ---------- */}
      <div className="space-y-6 sm:space-y-8">
        <div className="group relative">
          <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8">
            {/* ---------- Profile Content ---------- */}
            <div className="space-y-4 sm:space-y-6">
              {/* ---------- User Information ---------- */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-6">
                <div className="relative flex-shrink-0">
                  <div className="from-ember-400 to-ember-600 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold text-amber-50 sm:h-20 sm:w-20 sm:text-xl md:h-24 md:w-24 md:text-2xl">
                    {userInitials}
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-ember-400 mb-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-2xl">
                    {user.user?.first_name} {user.user?.last_name}
                  </h2>
                  <p className="text-charcoal-300 text-sm sm:text-base md:text-lg">
                    {user.user?.email}
                  </p>
                </div>
              </div>
              {/* ---------- User Details ---------- */}
              <div className="bg-charcoal-800/60 rounded-xl p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                      First name:
                    </span>
                    <p className="text-charcoal-200 text-base sm:text-lg">
                      {user.user?.first_name}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                      Last name:
                    </span>
                    <p className="text-charcoal-200 text-base sm:text-lg">
                      {user.user?.last_name}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                      Phone:
                    </span>
                    <p className="text-charcoal-200 text-base sm:text-lg">
                      {user.user?.phone}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                      Email:
                    </span>
                    <p className="text-charcoal-200 text-base sm:text-lg">
                      {user.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Update Info Dialog ---------- */}
      <Dialog
        title="Edit Profile"
        isOpen={isOpen}
        description="Update your personal information"
        size="md"
        icon={<Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />}
        onClose={() => {
          editUser.resetToInitial();
          setIsOpen(false);
        }}
        buttons={{
          cancel: {
            text: 'Close',
            onClick: () => {
              editUser.resetToInitial();
              setIsOpen(false);
            },
          },
          confirm: {
            text: editUser.isSubmitting ? 'Saving...' : 'Save Changes',
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
          columns={1}
        />
      </Dialog>
    </main>
  );
}
