import React, { useState } from 'react';
import Link from './../Link';

const CategoryNav: React.FC = () => {
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
    <section className="bg-charcoal-800 border-charcoal-600/50 border-y">
      <div className="mx-auto flex max-w-7xl justify-center sm:px-6 md:px-10">
        <div className="custom-scroll-x flex justify-start gap-1 overflow-x-auto pb-2 sm:gap-2">
          {categories.map((category) => (
            <Link
              key={category}
              text={category}
              variant="text"
              size="sm"
              selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              className="min-w-max flex-shrink-0 whitespace-nowrap"
              href={`#${category.toLowerCase()}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryNav;
