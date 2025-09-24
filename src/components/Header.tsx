import { useState } from 'react';
import AccountHeader from './account/AccountHeader';
import Cart from './cart/Cart';
import Logo from './Logo';
import Button from './Button';
import Link from './Link';
import CategoryNav from './CategoryNav';

const Header = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home',
    'Sports',
    'Beauty',
    'Jewelry',
    'Watches',
  ];

  return (
    <>
      {/* ---------- Main Header ---------- */}
      <header className="bg-charcoal-800 top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 md:px-10 md:py-6">
          <Logo />
          <div className="flex items-center gap-2 sm:gap-4">
            <AccountHeader />
            <Cart />
          </div>
        </div>
      </header>

      <CategoryNav />
    </>
  );
};

export default Header;
