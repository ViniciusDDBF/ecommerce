import React, { useState } from 'react';
import { Heart, ShoppingCart, X, Star, Filter, Grid, List } from 'lucide-react';
import Button from '../Button';

export default function AccountWishlist() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('newest');
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Wireless Bluetooth Headphones Pro',
      price: 199.99,
      originalPrice: 249.99,
      image: '/api/placeholder/300/300',
      rating: 4.8,
      reviewCount: 1247,
      inStock: true,
      discount: 20,
      addedDate: '2024-09-05',
      category: 'Electronics',
      brand: 'TechPro',
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair - Premium',
      price: 399.99,
      originalPrice: 499.99,
      image: '/api/placeholder/300/300',
      rating: 4.6,
      reviewCount: 892,
      inStock: true,
      discount: 20,
      addedDate: '2024-09-03',
      category: 'Furniture',
      brand: 'ComfortMax',
    },
    {
      id: 3,
      name: 'Smart Fitness Watch - Black',
      price: 299.99,
      originalPrice: 349.99,
      image: '/api/placeholder/300/300',
      rating: 4.7,
      reviewCount: 2156,
      inStock: false,
      discount: 14,
      addedDate: '2024-09-01',
      category: 'Wearables',
      brand: 'FitTech',
    },
    {
      id: 4,
      name: 'Professional Camera Lens 50mm',
      price: 899.99,
      originalPrice: 999.99,
      image: '/api/placeholder/300/300',
      rating: 4.9,
      reviewCount: 445,
      inStock: true,
      discount: 10,
      addedDate: '2024-08-28',
      category: 'Photography',
      brand: 'LensMaster',
    },
    {
      id: 5,
      name: 'Mechanical Gaming Keyboard RGB',
      price: 129.99,
      originalPrice: 149.99,
      image: '/api/placeholder/300/300',
      rating: 4.5,
      reviewCount: 1633,
      inStock: true,
      discount: 13,
      addedDate: '2024-08-25',
      category: 'Gaming',
      brand: 'GameForce',
    },
    {
      id: 6,
      name: 'Leather Laptop Bag - Brown',
      price: 89.99,
      originalPrice: 119.99,
      image: '/api/placeholder/300/300',
      rating: 4.4,
      reviewCount: 567,
      inStock: true,
      discount: 25,
      addedDate: '2024-08-20',
      category: 'Accessories',
      brand: 'StyleCraft',
    },
  ]);

  const removeFromWishlist = (itemId) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const addToCart = (item) => {
    console.log('Adding to cart:', item.name);
    // Add to cart logic here
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.addedDate) - new Date(a.addedDate);
      case 'oldest':
        return new Date(a.addedDate) - new Date(b.addedDate);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const ProductCard = ({ item }) => (
    <div className="glass-effect group ember-transition overflow-hidden rounded-xl hover:shadow-xl">
      <div className="relative">
        <div className="bg-charcoal-700 flex aspect-square items-center justify-center">
          <div className="text-charcoal-400 text-4xl font-light">📷</div>
        </div>

        {item.discount > 0 && (
          <div className="bg-ember-500 absolute top-3 left-3 rounded-md px-2 py-1 text-xs font-bold text-white">
            -{item.discount}%
          </div>
        )}

        <button
          onClick={() => removeFromWishlist(item.id)}
          className="ember-transition absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm group-hover:opacity-100 hover:bg-red-500/70"
        >
          <X size={16} />
        </button>

        {!item.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-medium text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <div className="text-ember-400 mb-1 text-xs font-medium">
            {item.brand}
          </div>
          <h3 className="text-charcoal-100 mb-2 line-clamp-2 text-lg font-semibold">
            {item.name}
          </h3>
        </div>

        <div className="mb-3 flex items-center">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(item.rating)
                    ? 'text-ember-400 fill-current'
                    : 'text-charcoal-400'
                }
              />
            ))}
          </div>
          <span className="text-charcoal-400 ml-2 text-xs">
            ({item.reviewCount})
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-ember-400 text-xl font-bold">
              ${item.price}
            </span>
            {item.originalPrice > item.price && (
              <span className="text-charcoal-400 text-sm line-through">
                ${item.originalPrice}
              </span>
            )}
          </div>
        </div>

        <Button
          text={item.inStock ? 'Add to Cart' : 'Notify When Available'}
          variant={item.inStock ? 'primary' : 'secondary'}
          size="full"
          startIcon={<ShoppingCart size={16} />}
          disabled={!item.inStock}
          onClick={() => addToCart(item)}
        />
      </div>
    </div>
  );

  const ProductListItem = ({ item }) => (
    <div className="glass-effect ember-transition group flex items-center space-x-4 rounded-xl p-4 hover:shadow-lg">
      <div className="relative">
        <div className="bg-charcoal-700 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-lg">
          <div className="text-charcoal-400 text-2xl">📷</div>
        </div>

        {item.discount > 0 && (
          <div className="bg-ember-500 absolute -top-2 -left-2 rounded-md px-2 py-1 text-xs font-bold text-white">
            -{item.discount}%
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <div className="text-ember-400 mb-1 text-xs font-medium">
              {item.brand}
            </div>
            <h3 className="text-charcoal-100 mb-2 text-lg font-semibold">
              {item.name}
            </h3>

            <div className="mb-2 flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < Math.floor(item.rating)
                        ? 'text-ember-400 fill-current'
                        : 'text-charcoal-400'
                    }
                  />
                ))}
                <span className="text-charcoal-400 ml-1 text-xs">
                  ({item.reviewCount})
                </span>
              </div>

              <span className="text-charcoal-400 text-xs">
                Added {new Date(item.addedDate).toLocaleDateString()}
              </span>
            </div>

            <div className="mb-3 flex items-center space-x-2">
              <span className="text-ember-400 text-xl font-bold">
                ${item.price}
              </span>
              {item.originalPrice > item.price && (
                <span className="text-charcoal-400 text-sm line-through">
                  ${item.originalPrice}
                </span>
              )}
              {!item.inStock && (
                <span className="rounded bg-red-500/20 px-2 py-1 text-xs text-red-400">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          <div className="ml-4 flex items-center space-x-2">
            <Button
              text={item.inStock ? 'Add to Cart' : 'Notify'}
              variant={item.inStock ? 'primary' : 'secondary'}
              size="sm"
              startIcon={<ShoppingCart size={14} />}
              disabled={!item.inStock}
              onClick={() => addToCart(item)}
            />
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="ember-transition flex h-8 w-8 items-center justify-center rounded-lg border border-red-400 bg-transparent text-red-400 opacity-0 group-hover:opacity-100 hover:bg-red-500/20"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-ember-400 mb-1 text-2xl font-bold">
              My Wishlist
            </h2>
            <p className="text-charcoal-300">
              {wishlistItems.length} items saved for later
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-charcoal-700 border-charcoal-500 text-charcoal-100 focus:border-ember-400 focus:ring-ember-300 focus:ring-opacity-20 ember-transition appearance-none rounded-lg border px-4 py-2 pr-8 text-sm focus:ring-2"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <Filter
                size={16}
                className="text-charcoal-400 pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 transform"
              />
            </div>

            {/* View Toggle */}
            <div className="bg-charcoal-700 flex rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`ember-transition rounded-md p-2 ${
                  viewMode === 'grid'
                    ? 'bg-ember-500 text-white'
                    : 'text-charcoal-400 hover:text-charcoal-200'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`ember-transition rounded-md p-2 ${
                  viewMode === 'list'
                    ? 'bg-ember-500 text-white'
                    : 'text-charcoal-400 hover:text-charcoal-200'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      {wishlistItems.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              : 'space-y-4'
          }
        >
          {sortedItems.map((item) =>
            viewMode === 'grid' ? (
              <ProductCard key={item.id} item={item} />
            ) : (
              <ProductListItem key={item.id} item={item} />
            ),
          )}
        </div>
      ) : (
        <div className="glass-effect rounded-xl p-12 text-center">
          <Heart size={48} className="text-charcoal-400 mx-auto mb-4" />
          <h3 className="text-charcoal-300 mb-2 text-xl font-semibold">
            Your wishlist is empty
          </h3>
          <p className="text-charcoal-400 mb-6">
            Save items you love to your wishlist and never lose track of them
          </p>
          <Button text="Start Shopping" variant="primary" size="lg" />
        </div>
      )}

      {/* Wishlist Actions */}
      {wishlistItems.length > 0 && (
        <div className="glass-effect rounded-xl p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="text-charcoal-300">
              Total value:{' '}
              <span className="text-ember-400 text-lg font-bold">
                $
                {wishlistItems
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex space-x-3">
              <Button
                text="Add All to Cart"
                variant="primary"
                size="md"
                startIcon={<ShoppingCart size={16} />}
                disabled={wishlistItems.some((item) => !item.inStock)}
              />
              <Button text="Share Wishlist" variant="secondary" size="md" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
