import type { FC, Iuser } from '@/types';
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { CustomerInitials, Dialog } from '@/components/atoms';
import { FormGrid } from '@/components/molecules';
import { AccountSectionHeader, editUserFields } from '@/features';
import { useForm } from '@/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { ThunkUpdateUser } from '@/store/slices/userSlice';

export const AccountProfile: FC = () => {
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const editUser = useForm({
    fields: editUserFields,
    initialValues: {
      first_name: user.user?.first_name,
      last_name: user.user?.last_name,
      email: user.user?.email,
      phone: user.user?.phone,
    },
  });

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
      await dispatch(ThunkUpdateUser(fullPayload as Iuser));
      setIsOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      {/* ---------- Header Section ---------- */}
      <AccountSectionHeader
        button={{
          startIcon: <Edit2 className="h-3 w-3 sm:h-4 sm:w-4" />,
          text: 'Edit Profile',
          onClick: () => setIsOpen(true),
        }}
        subtitle="Manage your personal information"
        title="My Profile"
      />

      {/* ---------- Profile Card ---------- */}
      <div className="space-y-6 sm:space-y-8">
        <div className="group relative">
          <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8">
            {/* ---------- Profile Content ---------- */}
            <div className="space-y-4 sm:space-y-6">
              {/* ---------- User Information ---------- */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 md:space-x-6">
                {user.user?.first_name &&
                  user.user?.email &&
                  user.user?.last_name && (
                    <CustomerInitials
                      email={user.user?.email}
                      firstName={user.user?.first_name}
                      lastName={user.user?.last_name}
                      size="xl"
                    />
                  )}
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
            loading: user.isLoading,
          },
        }}
        description="Update your personal information"
        icon={<Edit2 className="h-4 w-4 sm:h-5 sm:w-5" />}
        isOpen={isOpen}
        onClose={() => {
          editUser.resetToInitial();
          setIsOpen(false);
        }}
        size="md"
        title="Edit Profile"
      >
        <FormGrid
          columns={1}
          errors={editUser.errors}
          fields={editUserFields}
          onChange={editUser.setValue}
          values={editUser.values as Record<string, string>}
        />
      </Dialog>
    </main>
  );
};
