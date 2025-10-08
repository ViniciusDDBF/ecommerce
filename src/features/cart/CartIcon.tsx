import type { CartIconProps, FC } from '@/types';
import { ShoppingCart } from 'lucide-react';
import { IconOverlay } from '@/components/atoms';
import { useKeyPress } from '@/hooks';

export const CartIcon: FC<CartIconProps> = ({ count = 1, onClick }) => {
  const handleKeyDown = useKeyPress({ onClick });

  return (
    <IconOverlay
      icon={
        <ShoppingCart className="text-charcoal-200 h-5 w-5 sm:h-6 sm:w-6" />
      }
      showBadge={count > 0}
      count={count}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Cart with ${count} item${count !== 1 ? 's' : ''}`}
    />
  );
};
