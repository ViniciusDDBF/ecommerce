import { useState } from 'react';
import AccountHeader from './account/AccountHeader';
import Cart from './cart/Cart';
import Logo from './Logo';
import Button from './Button';

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
      <header className="bg-charcoal-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
          <Logo />
          <div className="flex gap-4">
            <AccountHeader />
            <Cart />
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="bg-charcoal-800 border-charcoal-700/50 border-y">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="flex justify-center gap-2 overflow-x-auto p-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Button
                size="sm"
                key={category}
                text={category}
                variant={activeCategory === category ? 'primary' : 'ghost'}
                selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
