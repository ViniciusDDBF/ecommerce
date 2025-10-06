import type { AddressData } from '../../../../types';

export interface AddressCardProps {
  address: AddressData;
  onEdit: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
}
