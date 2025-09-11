import WishlistIcon from './WishlistIcon';
import { Link } from 'react-router';

const Wishlist = () => {
  return (
    <div>
      <Link to="/wishlist">{<WishlistIcon />}</Link>
    </div>
  );
};

export default Wishlist;
