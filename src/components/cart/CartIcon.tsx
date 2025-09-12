import { ShoppingCart } from 'lucide-react';
import IconOverlay from '../IconOverlay';
import useKeyPress from '../../hooks/useKeyPress'; // Adjust path as needed

type CartIconProps = {
  count?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CartIcon: React.FC<CartIconProps> = ({ count = 1, onClick }) => {
  const handleKeyDown = useKeyPress(onClick);

  return (
    <IconOverlay
      icon={<ShoppingCart className="h-6 w-6 text-gray-200" />}
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

export default CartIcon;
