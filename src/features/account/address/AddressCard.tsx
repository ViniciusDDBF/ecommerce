import { Edit3, Trash2, Shield, User, MapPin, House } from 'lucide-react';
import { Button } from '../../../components/atoms';
import type { AddressData } from '../../../store/slices/userSlice';

interface AddressCardProps {
  address: AddressData;
  onEdit: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
}

export const AddressCard = ({
  address,
  onEdit,
  onSetDefault,
  onDelete,
}: AddressCardProps) => {
  return (
    <div className="group relative">
      <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8">
        {/* Header Row - Address Name, Default Badge, and Actions */}
        <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:mb-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 sm:gap-4">
            <House className="text-ember-400 h-5 w-5 sm:h-6 sm:w-6" />
            <h3 className="text-ember-400 text-lg font-semibold sm:text-xl md:text-2xl">
              {address.address_name}
            </h3>
            {address.is_default && (
              <div className="bg-ember-400 shadow-ember-500/40 flex items-center gap-2 rounded-full px-2 py-1 shadow-lg sm:px-3 sm:py-1.5">
                <Shield className="text-charcoal-50 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-charcoal-50 text-xs font-semibold sm:text-sm">
                  Default
                </span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:gap-3">
            <Button
              text="Edit"
              variant="secondary"
              size="sm"
              startIcon={<Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />}
              onClick={onEdit}
              className="w-full sm:w-auto"
            />
            {!address.is_default && (
              <>
                <Button
                  text="Set Default"
                  variant="primary"
                  size="sm"
                  startIcon={<Shield className="h-3 w-3 sm:h-4 sm:w-4" />}
                  onClick={onSetDefault}
                  className="w-full sm:w-auto"
                />
                <Button
                  text="Delete"
                  variant="secondary"
                  size="sm"
                  startIcon={<Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />}
                  onClick={onDelete}
                  className="w-full sm:w-auto"
                />
              </>
            )}
          </div>
        </div>

        {/* Address Content */}
        <div className="space-y-4 sm:space-y-6">
          {/* Recipient Information */}
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

          {/* Address Information */}
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
                  {address.city}, {address.state} {address.postal_code}
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
  );
};
