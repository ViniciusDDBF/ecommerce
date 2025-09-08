import { ShoppingCart } from 'lucide-react';
import IconOverlay from '../IconOverlay';

type CartIconProps = {
  count?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CartIcon: React.FC<CartIconProps> = ({ count = 1, onClick }) => {
  return (
    <IconOverlay
      icon={<ShoppingCart className="w-6 h-6 text-gray-200" />}
      showBadge={true}
      count={count}
      onClick={onClick}
    />
  );
};

export default CartIcon;
