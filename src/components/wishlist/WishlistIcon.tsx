import React from 'react';
import { Heart } from 'lucide-react';
import IconOverlay from '../IconOverlay';

type CartIconProps = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const wishlistIcon: React.FC<CartIconProps> = ({ onClick }) => {
  return (
    <div>
      <IconOverlay
        onClick={onClick}
        icon={<Heart className="w-6 h-6 text-gray-200" />}
      />
    </div>
  );
};

export default wishlistIcon;
