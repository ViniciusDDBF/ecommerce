import type { AccountIconProps, FC } from '@/types';
import { User } from 'lucide-react';
import { IconOverlay } from '@/components/atoms';
import { useKeyPress } from '@/hooks';

export const AccountIcon: FC<AccountIconProps> = ({ onClick }) => {
  const handleKeyDown = useKeyPress({ onClick });

  return (
    <IconOverlay
      aria-label="User account"
      icon={<User className="text-charcoal-200 h-5 w-5 sm:h-6 sm:w-6" />}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={onClick ? 0 : -1}
    />
  );
};
