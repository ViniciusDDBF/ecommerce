import type { AddressData } from '../../../types';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import {
  AddressFormDialog,
  AddressCard,
  DeleteAddressModal,
  EmptyAddressesState,
  AccountSectionHeader,
} from '../../../features';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import {
  ThunkCreateCustomerAddress,
  ThunkUpdateCustomerAddress,
  ThunkDeleteCustomerAddress,
  ThunkUpdateCustomerDefaultAddress,
} from '../../../store/slices/userSlice';
import { addressFields } from './constants';

export const Addresses = () => {
  const [addressSelected, setAddressSelected] = useState<AddressData | null>(
    null,
  );
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

  const sortedAddresses =
    user.user?.addresses
      ?.slice()
      .sort((a, b) => Number(b.is_default) - Number(a.is_default)) || [];

  const handleCreateAddress = async (values: Partial<AddressData>) => {
    if (user.user) {
      const fullPayload = {
        ...values,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
        is_default: !user.user.addresses?.length,
      } as AddressData;
      await dispatch(ThunkCreateCustomerAddress(fullPayload));
      setCreateIsOpen(false);
    }
  };

  const handleUpdateAddress = async (values: Partial<AddressData>) => {
    if (user.user && addressSelected) {
      const fullPayload = {
        ...values,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
        address_id: addressSelected.address_id,
      } as AddressData;
      await dispatch(ThunkUpdateCustomerAddress(fullPayload));
      setUpdateIsOpen(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (user.user && addressSelected) {
      const payload = {
        ...addressSelected,
        user_id: user.user.user_id,
      } as AddressData;
      await dispatch(ThunkDeleteCustomerAddress(payload));
      setDeleteIsOpen(false);
    }
  };

  const handleSetDefault = async (address: AddressData) => {
    if (user.user) {
      const payload = {
        address_id: address.address_id,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
      } as AddressData;
      await dispatch(ThunkUpdateCustomerDefaultAddress(payload));
    }
  };

  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <AccountSectionHeader
          title="My Addresses"
          subtitle="Manage your delivery locations"
          button={{
            icon: <Plus className="h-4 w-4 sm:h-5 sm:w-5" />,
            text: 'Add Address',
            onClick: () => setCreateIsOpen(true),
          }}
        />

        {/* Address Cards */}
        <div className="space-y-6 sm:space-y-8">
          {sortedAddresses.map((address, idx) => (
            <AddressCard
              key={idx}
              address={address}
              onEdit={() => {
                setAddressSelected(address);
                setUpdateIsOpen(true);
              }}
              onSetDefault={() => handleSetDefault(address)}
              onDelete={() => {
                setAddressSelected(address);
                setDeleteIsOpen(true);
              }}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedAddresses.length === 0 && (
          <EmptyAddressesState onAddClick={() => setCreateIsOpen(true)} />
        )}

        {/* Create Dialog */}
        <AddressFormDialog
          mode="create"
          isOpen={createIsOpen}
          fields={addressFields}
          onSubmit={handleCreateAddress}
          onClose={() => setCreateIsOpen(false)}
          isLoading={user.isLoading}
        />

        {/* Update Dialog */}
        <AddressFormDialog
          mode="update"
          isOpen={updateIsOpen}
          fields={addressFields}
          initialValues={addressSelected ?? undefined}
          onSubmit={handleUpdateAddress}
          onClose={() => setUpdateIsOpen(false)}
          isLoading={user.isLoading}
        />

        {/* Delete Modal */}
        <DeleteAddressModal
          isOpen={deleteIsOpen}
          onClose={() => setDeleteIsOpen(false)}
          onConfirm={handleDeleteAddress}
        />
      </div>
    </div>
  );
};
