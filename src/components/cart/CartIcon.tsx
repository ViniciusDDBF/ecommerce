import { ShoppingCart } from 'lucide-react';

type CartIconProps = {
  count?: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CartIcon: React.FC<CartIconProps> = ({ count = 1, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-charcoal-700 hover:bg-charcoal-600 transition-colors cursor-pointer align-middle"
    >
      {/* Cart Icon */}
      <ShoppingCart className="w-6 h-6 text-gray-200" />

      {/* Badge (small circle above) */}
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-ember-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {count}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
