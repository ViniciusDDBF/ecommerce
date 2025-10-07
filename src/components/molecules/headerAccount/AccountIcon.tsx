import type { AccountIconProps, FC } from '../../../types';
import { User } from 'lucide-react';
import { IconOverlay } from '../../atoms';
import { useKeyPress } from '../../../hooks';

export const AccountIcon: FC<AccountIconProps> = ({ onClick }) => {
  const handleKeyDown = useKeyPress({ onClick });

  return (
    <IconOverlay
      icon={<User className="text-charcoal-200 h-5 w-5 sm:h-6 sm:w-6" />}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="User account"
    />
  );
};
