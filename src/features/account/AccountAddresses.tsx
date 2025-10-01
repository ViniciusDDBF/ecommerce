// #region /* ---------- Imports ---------- */

import { useState } from 'react';
import { MapPin, Edit3, Trash2, Plus, User, Shield, House } from 'lucide-react';
import Button from '../../components/atoms/Button';
import FormGrid from '../../components/molecules/form/FormGrid';
import Dialog from '../../components/atoms/Dialog';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  ThunkCreateCustomerAddress,
  ThunkUpdateCustomerAddress,
  ThunkDeleteCustomerAddress,
  type AddressData,
  ThunkUpdateCustomerDefaultAddress,
} from '../../store/slices/userSlice';
import Modal from '../../components/atoms/Modal';
import AccountSectionHeader from './AccountSectionHeader';
import type { FormFieldProps } from '../../types/hooks';

// #endregion

const addressFields: FormFieldProps[] = [
  {
    name: 'address_name',
    label: 'Address Name',
    type: 'text',
    placeholder: 'Enter your address name',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'recipient_name',
    label: 'Who is receiving?',
    type: 'text',
    placeholder: 'Who is receiving this product?',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'postal_code',
    label: 'Postal Code',
    type: 'text',
    placeholder: 'Enter your postal code',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'street',
    label: 'Street',
    type: 'text',
    placeholder: 'Enter your street',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'number',
    label: 'Number',
    type: 'text',
    placeholder: 'Residence number',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'complement',
    label: 'Complement',
    type: 'text',
    placeholder: 'Enter your complement',
    colSpan: 1,
  },
  {
    name: 'neighborhood',
    label: 'Neighborhood',
    type: 'text',
    placeholder: 'Enter your neighborhood',
    colSpan: 2,
    validation: { required: true },
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    placeholder: 'Enter your city',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'state',
    label: 'State',
    type: 'text',
    placeholder: 'Enter your state',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'country',
    label: 'Country',
    type: 'text',
    placeholder: 'Enter your country',
    colSpan: 2,
    validation: { required: true },
  },
];

const MyAddressesPage = () => {
  const [addressSelected, setAddressSelected] = useState<AddressData | null>(
    null,
  );
  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [updateIsOpen, setUpdateIsOpen] = useState(false);
  const [deleteAddressModal, setDeleteAddressModal] = useState(false);
  const createAddress = useForm(addressFields);
  const updateAddress = useForm(addressFields, addressSelected ?? undefined);
  const user = useAppSelector('user');
  const dispatch = useAppDispatch();

  const handleCreateAddress = async () => {
    if (!createAddress.validate()) return;
    if (user.user) {
      const fullPayload = {
        ...createAddress.values,
        customer_id: user.user?.customer_id,
        user_id: user.user?.user_id,
        is_default: !user.user?.addresses?.length,
      };
      try {
        await dispatch(ThunkCreateCustomerAddress(fullPayload as AddressData));
      } finally {
        setCreateIsOpen(false);
      }
    }
  };

  const handleUpdateAddress = async () => {
    if (!updateAddress.validate()) return;
    if (user.user && addressSelected) {
      const fullPayload = {
        ...updateAddress.values,
        customer_id: user.user?.customer_id,
        user_id: user.user?.user_id,
        address_id: addressSelected.address_id,
      };
      try {
        await dispatch(ThunkUpdateCustomerAddress(fullPayload as AddressData));
      } finally {
        setUpdateIsOpen(false);
      }
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
            text: 'Edit Profile',
            onClick: () => setCreateIsOpen(true),
          }}
        />

        {/* ---------- Address Cards ---------- */}
        <div className="space-y-6 sm:space-y-8">
          {user.user?.addresses
            ?.slice()
            .sort((a, b) => Number(b.is_default) - Number(a.is_default))
            .map((address, idx) => (
              <div key={idx} className="group relative">
                <div className="bg-charcoal-800/80 border-charcoal-600 hover:border-ember-400/50 rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl sm:p-6 md:p-8">
                  {/* ---------- Header Row - Address Name, Default Badge, and Actions ---------- */}
                  <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:mb-6 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <House className="text-ember-400 h-5 w-5 sm:h-6 sm:w-6" />
                      <h3 className="text-ember-400 text-lg font-semibold sm:text-xl md:text-2xl">
                        {address.address_name}
                      </h3>
                      {address.is_default && (
                        <div className="bg-ember-400 shadow-ember-500/40 flex items-center gap-2 rounded-full px-2 py-1 shadow-lg sm:px-3 sm:py-1.5">
                          <Shield className="h-3 w-3 text-white sm:h-4 sm:w-4" />
                          <span className="text-xs font-semibold text-white sm:text-sm">
                            Default
                          </span>
                        </div>
                      )}
                    </div>

                    {/* ---------- Action Buttons ---------- */}
                    <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
                      <Button
                        text="Edit"
                        variant="secondary"
                        size="sm"
                        startIcon={<Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />}
                        onClick={() => {
                          setAddressSelected(address);
                          updateAddress.setValuesAll({
                            address_name: address?.address_name,
                            recipient_name: address.recipient_name,
                            postal_code: address.postal_code,
                            number: address.number,
                            complement: address.complement,
                            street: address.street,
                            neighborhood: address.neighborhood,
                            city: address.city,
                            state: address.state,
                            country: address.country,
                          });
                          setUpdateIsOpen(true);
                        }}
                        className="w-full sm:w-auto"
                      />
                      {!address.is_default && (
                        <>
                          <Button
                            text="Set Default"
                            variant="primary"
                            size="sm"
                            startIcon={
                              <Shield className="h-3 w-3 sm:h-4 sm:w-4" />
                            }
                            onClick={async () => {
                              const payload = {
                                address_id: address.address_id,
                                customer_id: user.user?.customer_id,
                                user_id: user.user?.user_id,
                              };
                              await dispatch(
                                ThunkUpdateCustomerDefaultAddress(
                                  payload as AddressData,
                                ),
                              );
                            }}
                            className="w-full sm:w-auto"
                          />
                          <Button
                            text="Delete"
                            variant="secondary"
                            size="sm"
                            startIcon={
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            }
                            onClick={() => {
                              setDeleteAddressModal(true);
                              setAddressSelected(address);
                            }}
                            className="w-full sm:w-auto"
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* ---------- Address Content ---------- */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* ---------- Recipient Information ---------- */}
                    <div className="bg-charcoal-800/60 rounded-xl p-4 sm:p-6">
                      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                        <User className="text-ember-400 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-ember-400 text-xs font-medium tracking-wide uppercase sm:text-sm">
                          Recipient
                        </span>
                      </div>
                      <p className="text-charcoal-100 text-base font-medium sm:text-xl">
                        {address.recipient_name}
                      </p>
                    </div>

                    {/* ---------- Address Information ---------- */}
                    <div className="bg-charcoal-800/60 rounded-xl p-4 sm:p-6">
                      <div className="mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3">
                        <MapPin className="text-ember-400 h-4 w-4 sm:h-5 sm:w-5" />
                        <span className="text-ember-400 text-xs font-medium tracking-wide uppercase sm:text-sm">
                          Address
                        </span>
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                            Street:
                          </span>
                          <p className="text-charcoal-100 text-base sm:text-lg">
                            {address.street}
                          </p>
                        </div>
                        {address.neighborhood && (
                          <div className="flex items-start gap-2 sm:gap-3">
                            <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                              Area:
                            </span>
                            <p className="text-charcoal-200 text-base sm:text-lg">
                              {address.neighborhood}
                            </p>
                          </div>
                        )}
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                            City:
                          </span>
                          <p className="text-charcoal-200 text-base sm:text-lg">
                            {address.city}, {address.state}{' '}
                            {address.postal_code}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span className="text-charcoal-400 min-w-[80px] text-sm font-medium sm:min-w-[100px] sm:text-base">
                            Country:
                          </span>
                          <p className="text-charcoal-300 text-base sm:text-lg">
                            {address.country}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ---------- Empty State ---------- */}
        {user.user?.addresses && user.user?.addresses.length === 0 && (
          <div className="py-6 text-center sm:py-8">
            <div
              onClick={() => setCreateIsOpen(true)}
              className="group cursor-pointer"
            >
              <div className="border-charcoal-600 hover:border-ember-400/50 bg-charcoal-800/30 hover:bg-charcoal-800/50 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12 md:p-16">
                <h3 className="text-charcoal-300 group-hover:text-charcoal-200 mb-6 text-xl font-light transition sm:mb-8 sm:text-2xl md:text-3xl">
                  No addresses saved yet!
                </h3>
                <div className="bg-charcoal-700 group-hover:bg-ember-500/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 sm:mb-6 sm:h-20 sm:w-20">
                  <Plus className="text-charcoal-400 group-hover:text-ember-400 h-8 w-8 transition-all duration-300 sm:h-10 sm:w-10" />
                </div>
                <h3 className="text-charcoal-300 group-hover:text-charcoal-200 text-base font-medium transition-all duration-300 sm:text-lg md:text-xl">
                  Add New Address
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* ---------- Create Address Form ---------- */}
        <Dialog
          title="Create Address"
          isOpen={createIsOpen}
          description="Add a new delivery address"
          size="xl"
          icon={<Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />}
          onClose={() => {
            createAddress.reset();
            setCreateIsOpen(false);
          }}
          buttons={{
            cancel: {
              text: 'Close',
              onClick: () => setCreateIsOpen(false),
            },
            confirm: {
              text: 'Create Address',
              onClick: () => handleCreateAddress(),
              props: { loading: user.isLoading },
            },
          }}
        >
          <FormGrid
            fields={addressFields}
            values={createAddress.values}
            errors={createAddress.errors}
            onChange={createAddress.setValue}
            columns={1}
          />
        </Dialog>

        {/* ---------- Update Address Form ---------- */}
        <Dialog
          title="Edit Address"
          isOpen={updateIsOpen}
          description="Update your address information"
          size="sm"
          icon={<Edit3 className="h-4 w-4 sm:h-5 sm:w-5" />}
          onClose={() => {
            updateAddress.reset();
            setUpdateIsOpen(false);
          }}
          buttons={{
            cancel: {
              text: 'Close',
              onClick: () => setUpdateIsOpen(false),
            },
            confirm: {
              text: 'Update Address',
              onClick: () => handleUpdateAddress(),
              props: { loading: user.isLoading },
            },
          }}
        >
          <FormGrid
            fields={addressFields}
            values={updateAddress.values}
            errors={updateAddress.errors}
            onChange={updateAddress.setValue}
            columns={1}
          />
        </Dialog>

        {/* ---------- Delete Address Modal ---------- */}
        {deleteAddressModal && (
          <Modal
            isOpen={deleteAddressModal}
            title="Delete Address"
            message="This action is permanent"
            buttons={{
              cancel: {
                text: 'Close',
                onClick: () => setDeleteAddressModal(false),
              },
              confirm: {
                text: 'Delete',
                onClick: async () => {
                  if (user.user && addressSelected) {
                    const payload = {
                      ...addressSelected,
                      user_id: user.user?.user_id,
                    };
                    await dispatch(
                      ThunkDeleteCustomerAddress(payload as AddressData),
                    );
                    setDeleteAddressModal(false);
                  }
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyAddressesPage;
