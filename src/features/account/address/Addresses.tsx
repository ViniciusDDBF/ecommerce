import type { Address, FC } from '@/types';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { nanoid } from '@reduxjs/toolkit';
import {
  AccountSectionHeader,
  AddressCard,
  AddressFormDialog,
  addressFields,
  DeleteAddressModal,
  EmptyAddressesState,
} from '@/features';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import {
  ThunkCreateCustomerAddress,
  ThunkDeleteCustomerAddress,
  ThunkUpdateCustomerAddress,
  ThunkUpdateCustomerDefaultAddress,
} from '@/store/slices/userSlice';

export const Addresses: FC = () => {
  const [addressSelected, setAddressSelected] = useState<Address | null>(null);
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

  const sortedAddresses =
    user.user?.addresses
      ?.slice()
      .sort((a, b) => Number(b.is_default) - Number(a.is_default)) || [];

  const handleCreateAddress = async (values: Partial<Address>) => {
    if (user.user) {
      const fullPayload = {
        ...values,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
        is_default: !user.user.addresses?.length,
      } as Address;
      await dispatch(ThunkCreateCustomerAddress(fullPayload));
      setCreateIsOpen(false);
    }
  };

  const handleUpdateAddress = async (values: Partial<Address>) => {
    if (user.user && addressSelected) {
      const fullPayload = {
        ...values,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
        address_id: addressSelected.address_id,
      } as Address;
      await dispatch(ThunkUpdateCustomerAddress(fullPayload));
      setUpdateIsOpen(false);
    }
  };

  const handleDeleteAddress = async () => {
    if (user.user && addressSelected) {
      const payload = {
        ...addressSelected,
        user_id: user.user.user_id,
      } as Address;
      await dispatch(ThunkDeleteCustomerAddress(payload));
      setDeleteIsOpen(false);
    }
  };

  const handleSetDefault = async (address: Address) => {
    if (user.user) {
      const payload = {
        address_id: address.address_id,
        customer_id: user.user.customer_id,
        user_id: user.user.user_id,
      } as Address;
      await dispatch(ThunkUpdateCustomerDefaultAddress(payload));
    }
  };

  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <AccountSectionHeader
          button={{
            startIcon: <Plus className="h-4 w-4 sm:h-5 sm:w-5" />,
            text: 'Add Address',
            onClick: () => setCreateIsOpen(true),
          }}
          subtitle="Manage your delivery locations"
          title="My Addresses"
        />

        {/* Address Cards */}
        <div className="space-y-6 sm:space-y-8">
          {sortedAddresses.map((address) => (
            <AddressCard
              address={address}
              key={nanoid()}
              onDelete={() => {
                setAddressSelected(address);
                setDeleteIsOpen(true);
              }}
              onEdit={() => {
                setAddressSelected(address);
                setUpdateIsOpen(true);
              }}
              onSetDefault={() => handleSetDefault(address)}
            />
          ))}
        </div>

        {/* Empty State */}
        {sortedAddresses.length === 0 && (
          <EmptyAddressesState onAddClick={() => setCreateIsOpen(true)} />
        )}

        {/* Create Dialog */}
        <AddressFormDialog
          fields={addressFields}
          initialValues={{}}
          isLoading={user.isLoading}
          isOpen={createIsOpen}
          mode="create"
          onClose={() => setCreateIsOpen(false)}
          onSubmit={handleCreateAddress}
        />

        {/* Update Dialog */}
        {addressSelected && (
          <AddressFormDialog
            fields={addressFields}
            initialValues={addressSelected}
            isLoading={user.isLoading}
            isOpen={updateIsOpen}
            mode="update"
            onClose={() => setUpdateIsOpen(false)}
            onSubmit={handleUpdateAddress}
          />
        )}

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
