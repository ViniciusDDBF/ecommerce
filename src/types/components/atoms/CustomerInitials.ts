import type { Email, FirstName, LastName, Size } from '@/types';

export interface CustomerInitialsProps {
  email?: Email;
  firstName: FirstName;
  lastName?: LastName;
  size?: Size;
}
