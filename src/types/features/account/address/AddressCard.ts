import type { Address } from '@/types';

export interface AddressCardProps {
  address: Address;
  onDelete: () => void;
  onEdit: () => void;
  onSetDefault: () => void;
}
