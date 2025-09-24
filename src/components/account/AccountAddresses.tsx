// #region /* ---------- Imports ---------- */
import { useState } from 'react';
import { MapPin, Edit3, Trash2, Plus, User, Shield, House } from 'lucide-react';
import Button from '../Button';
import FormGrid from '../form/FormGrid';
import Dialog from '../Dialog';
import { useForm, type FormFieldProps } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import {
  ThunkCreateCustomerAddress,
  ThunkUpdateCustomerAddress,
  ThunkDeleteCustomerAddress,
  type AddressData,
  ThunkUpdateCustomerDefaultAddress,
} from '../../store/slices/userSlice';
import Modal from '../Modal';
// #endregion

const addressFields: FormFieldProps[] = [
  {
    name: 'address_name',
    label: 'Address Name',
    type: 'text',
    placeholder: 'Enter your address name',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'recipient_name',
    label: 'Who is receiving?',
    type: 'text',
    placeholder: 'Who is receiving this product?',
    colSpan: 1,
    validation: { required: true },
  },
  {
    name: 'postal_code',
    label: 'Postal Code',
    type: 'text',
    placeholder: 'Enter your postal_code',
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
      <div className="max-w-4xl p-6">
        {/* Header Section */}
        <div className="mb-12 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-charcoal-50 mb-3 text-4xl font-light">
              My Addresses
            </h1>
            <div className="bg-ember-500 mb-2 h-1 w-20 rounded-full"></div>
            <p className="text-charcoal-400 text-lg">
              Manage your delivery locations
            </p>
          </div>
          <div className="ml-8">
            <Button
              text="Add New Address"
              variant="primary"
              size="lg"
              startIcon={<Plus className="h-5 w-5" />}
              onClick={() => {
                setCreateIsOpen(true);
              }}
            />
          </div>
        </div>

        {/* Address Cards */}
        <div className="space-y-8">
          {user.user?.addresses
            ?.slice() // make a shallow copy so we don't mutate state
            .sort((a, b) => Number(b.is_default) - Number(a.is_default)) // true → 1, false → 0
            .map((address, idx) => {
              return (
                <div key={idx} className="group relative">
                  <div className="bg-charcoal-800/80 border-charcoal-600 hover:border-ember-400/50 rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                    {/* Header Row - Address Name, Default Badge, and Actions */}
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <House className="text-ember-400" />
                          <h3 className="text-ember-400 text-2xl font-semibold">
                            {address.address_name}
                          </h3>
                        </div>
                        {address.is_default && (
                          <div className="bg-ember-400 shadow-ember-500/40 flex items-center gap-2 rounded-full px-3 py-1.5 shadow-lg">
                            <Shield className="h-4 w-4 text-white" />
                            <span className="text-sm font-semibold text-white">
                              Default
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <Button
                          text="Edit"
                          variant="secondary"
                          size="sm"
                          startIcon={<Edit3 className="h-4 w-4" />}
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
                        />
                        {!address.is_default && (
                          <>
                            <Button
                              text="Set Default"
                              variant="primary"
                              size="sm"
                              startIcon={<Shield className="h-4 w-4" />}
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
                            />
                            <Button
                              text="Delete"
                              variant="secondary"
                              size="sm"
                              startIcon={<Trash2 className="h-4 w-4" />}
                              onClick={() => {
                                setDeleteAddressModal(true);
                                setAddressSelected(address);
                              }}
                            />
                          </>
                        )}
                      </div>
                    </div>

                    {/* Address Content */}
                    <div className="space-y-6">
                      {/* Recipient Information */}
                      <div className="bg-charcoal-800/60 rounded-xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <User className="text-ember-400 h-5 w-5" />
                          <span className="text-ember-400 text-sm font-medium tracking-wide uppercase">
                            Recipient
                          </span>
                        </div>
                        <div>
                          <p className="text-charcoal-100 text-xl font-medium">
                            {address.recipient_name}
                          </p>
                        </div>
                      </div>

                      {/* Address Information */}
                      <div className="bg-charcoal-800/60 rounded-xl p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <MapPin className="text-ember-400 h-5 w-5" />
                          <span className="text-ember-400 text-sm font-medium tracking-wide uppercase">
                            Address
                          </span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                              Street:
                            </span>
                            <p className="text-charcoal-100 text-xl font-medium">
                              {address.street}
                            </p>
                          </div>

                          {address.neighborhood && (
                            <div className="flex items-start gap-3">
                              <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                                Area:
                              </span>
                              <p className="text-charcoal-200 text-xl">
                                {address.neighborhood}
                              </p>
                            </div>
                          )}

                          <div className="flex items-start gap-3">
                            <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                              City:
                            </span>
                            <p className="text-charcoal-200 text-xl">
                              {address.city}, {address.state}{' '}
                              {address.postal_code}
                            </p>
                          </div>

                          <div className="flex items-start gap-3">
                            <span className="text-charcoal-400 min-w-[100px] text-lg font-medium">
                              Country:
                            </span>
                            <p className="text-charcoal-300 text-xl">
                              {address.country}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Empty State */}
        {user.user?.addresses && user.user?.addresses.length === 0 && (
          <div className="py-5 text-center">
            <div
              onClick={() => {
                setCreateIsOpen(true);
              }}
              className="group cursor-pointer"
            >
              <div className="border-charcoal-600 hover:border-ember-400/50 bg-charcoal-800/30 hover:bg-charcoal-800/50 rounded-2xl border-2 border-dashed p-16 text-center transition-all duration-300">
                <h3 className="text-charcoal-300 group-hover:text-charcoal-200 mb-10 text-3xl font-light transition">
                  No addresses saved yet!
                </h3>
                <div className="bg-charcoal-700 group-hover:bg-ember-500/20 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full transition-all duration-300">
                  <Plus className="text-charcoal-400 group-hover:text-ember-400 h-10 w-10 transition-all duration-300" />
                </div>
                <h3 className="text-charcoal-300 group-hover:text-charcoal-200 mb-2 text-xl font-medium transition-all duration-300">
                  Add New Address
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Address Form */}
      <Dialog
        title="Edit your informations"
        isOpen={createIsOpen}
        description="Create your account"
        size="xl"
        icon={<Edit3 />}
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
          columns={2}
        />
      </Dialog>

      {/* Update Address Form */}
      <Dialog
        title="Edit your address"
        isOpen={updateIsOpen}
        description="Edit your address information"
        size="xl"
        icon={<Edit3 />}
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
            text: 'Create Address',
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
          columns={2}
        />
      </Dialog>

      {/* Delete Address Modal */}
      {deleteAddressModal && (
        <Modal
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
                if (user.user) {
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
  );
};

export default MyAddressesPage;
