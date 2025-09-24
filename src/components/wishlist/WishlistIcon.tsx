import { Heart } from 'lucide-react';
import IconOverlay from '../IconOverlay';
import useKeyPress from '../../hooks/useKeyPress';

type WishlistIconProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const WishlistIcon: React.FC<WishlistIconProps> = ({ onClick }) => {
  const handleKeyDown = useKeyPress(onClick);

  return (
    <IconOverlay
      onClick={onClick}
      icon={<Heart className="text-charcoal-200 h-5 w-5 sm:h-6 sm:w-6" />}
      tabIndex={onClick ? 0 : -1}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label="Wishlist"
    />
  );
};

export default WishlistIcon;
