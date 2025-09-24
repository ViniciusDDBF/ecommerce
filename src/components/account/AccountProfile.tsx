// #region /* ---------- Imports ---------- */
import { Edit2 } from 'lucide-react';
import Button from '../Button';
import { useForm } from '../../hooks/useForm';
import type { FormFieldProps } from '../../hooks/useForm';
import FormGrid from '../form/FormGrid';
import { useState } from 'react';
import Dialog from '../Dialog';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ThunkUpdateUser, type UserData } from '../../store/slices/userSlice';
// #endregion

// #region /* ---------- Form fields ---------- */
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
// #endregion

export default function AccountProfile() {
  // #region /* ---------- Use Hooks ---------- */
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const editUser = useForm(editUserFields, {
    first_name: user.user?.first_name,
    last_name: user.user?.last_name,
    email: user.user?.email,
    phone: user.user?.phone,
  });
  // #endregion

  // #region /* ---------- Variables ---------- */
  const userInitials =
    (user.user?.first_name?.[0] ?? '') + (user.user?.last_name?.[0] ?? '');
  // #endregion

  // #region /* ---------- Functions ---------- */
  const handleUpdateUser = async () => {
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
  // #endregion

  return (
    <main className="p-6">
      {/* Header Section */}
      <div className="mb-12 flex items-start justify-between">
        <div className="flex-1">
          <h1 className="text-charcoal-50 mb-3 text-4xl font-light">
            My Profile
          </h1>
          <div className="bg-ember-500 mb-2 h-1 w-20 rounded-full"></div>
          <p className="text-charcoal-400 text-lg">
            Manage your personal information
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className="space-y-8">
        <div className="group relative">
          <div className="glass-effect rounded-2xl p-8">
            {/* Address Content */}
            <div className="space-y-6">
              {/* Recipient Information */}
              <div className="rounded-xl pb-6">
                <div className="flex space-x-6">
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
              {/* Address Information */}
              <div className="bg-charcoal-800/60 rounded-xl">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                      First name:
                    </span>
                    <p className="text-charcoal-200 text-xl">
                      {user.user?.first_name}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                      Last name:
                    </span>
                    <p className="text-charcoal-200 text-xl">
                      {user.user?.last_name}
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                      Phone:
                    </span>
                    <p className="text-charcoal-200 text-xl">
                      {user.user?.phone}
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                      Email:
                    </span>
                    <p className="text-charcoal-200 text-xl">
                      {user.user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3">
                <Button
                  text="Edit Profile"
                  variant="secondary"
                  size="md"
                  startIcon={<Edit2 className="h-4 w-4" />}
                  onClick={() => setIsOpen(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update info dialog */}
      <Dialog
        title="Edit your informations"
        isOpen={isOpen}
        description="Create your account"
        size="lg"
        icon={<Edit2 />}
        onClose={() => setIsOpen(false)}
        buttons={{
          cancel: {
            text: 'Close',
            onClick: () => {
              editUser.resetToInitial();
              setIsOpen(false);
            },
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
    </main>
  );
}
