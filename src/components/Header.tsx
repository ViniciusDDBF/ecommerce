import Account from './account/Account';
import Cart from './cart/Cart';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="flex items-center bg-charcoal-800 p-6 justify-between">
      <Logo />
      <div className="flex justify-between gap-4 pr-10">
        <Account />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
