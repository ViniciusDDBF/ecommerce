import AccountHeader from './account/AccountHeader';
import Cart from './cart/Cart';
import Logo from './Logo';

const Header = () => {
  return (
    <div className="bg-charcoal-800 flex items-center justify-between p-6">
      <Logo />
      <div className="flex justify-between gap-4 pr-10">
        <AccountHeader />
        <Cart />
      </div>
    </div>
  );
};

export default Header;
