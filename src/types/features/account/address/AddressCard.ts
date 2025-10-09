import type { Iaddress } from '@/types';

export interface AddressCardProps {
  address: Iaddress;
  onEdit: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
}
