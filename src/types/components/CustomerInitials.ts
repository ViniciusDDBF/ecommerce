import type { Size } from '../../types';

export interface CustomerInitialsProps {
  firstName: string | null;
  lastName?: string;
  email?: string;
  size?: Size;
}
