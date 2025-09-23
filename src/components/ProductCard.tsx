import { useState } from 'react';
import { Star, Heart, Plus } from 'lucide-react';
import Button from '../components/Button';

interface Variation {
  name: string;
  color: string;
  image: string;
  price: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  originalPrice?: number;
  sale?: number;
  variations?: Variation[];
}

interface MinimalGlassCardProps {
  product: Product;
  onAddToCart?: (product: Product, selectedVariation?: Variation) => void;
  onToggleFavorite?: (product: Product, isLiked: boolean) => void;
}

const MinimalGlassCard = ({
  product,
  onAddToCart,
  onToggleFavorite,
}: MinimalGlassCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const variations = product.variations || [];
  const selectedVariation = variations[selectedIndex] || {
    name: '',
    color: '',
    image: product.image,
    price: product.price,
  };

  const handleVariationClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedIndex(index);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onToggleFavorite?.(product, newLikedState);
  };

  const handleAddToCart = (event: React.MouseEvent) => {
    event.stopPropagation();
    onAddToCart?.(
      product,
      variations.length > 0 ? selectedVariation : undefined,
    );
  };

  return (
    <div
      className="group ember-transition from-charcoal-700/80 to-charcoal-800/80 border-charcoal-600/30 hover:border-ember-400/30 relative flex w-80 flex-shrink-0 snap-start flex-col overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-xl transition-all duration-500 hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle glow effect */}
      <div className="from-ember-500/5 absolute inset-0 z-0 rounded-2xl bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image Header */}
      <div className="relative z-10 overflow-hidden rounded-t-2xl rounded-b-none">
        <img
          src={selectedVariation.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Floating Action */}
        <div
          className={`absolute top-3 right-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          } z-20`}
        >
          <button
            onClick={handleLikeClick}
            className={`ember-transition rounded-full p-2 backdrop-blur-md transition-all duration-300 ${
              isLiked
                ? 'bg-ember-500/90 text-charcoal-50 shadow-lg'
                : 'bg-charcoal-50/90 text-charcoal-900 hover:bg-ember-500/90 hover:text-charcoal-50'
            }`}
          >
            <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Sale Badge */}
        {product.sale && (
          <div className="bg-ember-500 text-charcoal-50 animate-glow absolute top-3 left-3 z-20 rounded-full px-3 py-1 text-xs font-semibold shadow-lg">
            -{product.sale}%
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="z-10 flex min-h-[180px] flex-shrink-0 flex-col p-6">
        <div className="h-12">
          <h3 className="text-charcoal-50 group-hover:text-ember-300 ember-transition line-clamp-2 text-lg font-semibold break-words">
            {product.name}
          </h3>
        </div>

        <div className="mt-2 flex h-6 items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={`${i < product.rating ? 'text-ember-400 fill-current' : 'text-charcoal-500'}`}
              />
            ))}
          </div>
          <span className="text-charcoal-400 text-sm">({product.reviews})</span>
        </div>

        <div className="mt-2 flex h-12 items-center justify-between">
          <div className="space-y-1">
            {product.originalPrice && (
              <div className="text-charcoal-500 text-sm line-through">
                ${product.originalPrice}
              </div>
            )}
            <div className="text-ember-400 text-xl font-bold">
              ${selectedVariation.price}
            </div>
          </div>

          <Button
            text="Add"
            variant="primary"
            size="sm"
            startIcon={<Plus size={16} />}
            className="hover:animate-glow shadow-lg hover:shadow-xl"
            onClick={handleAddToCart}
          />
        </div>

        {/* Variation Selector */}
        <div className="z-20 mt-4 flex h-8 justify-center gap-2">
          {variations.length > 0 ? (
            variations.map((variation, index) => (
              <button
                key={index}
                onClick={(e) => handleVariationClick(index, e)}
                className={`focus:ring-ember-400 focus:ring-offset-charcoal-800 h-5 w-5 rounded-full transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                  selectedIndex === index
                    ? 'ring-ember-400 ring-offset-charcoal-800 scale-125 ring-2 ring-offset-2'
                    : 'hover:scale-110'
                }`}
                style={{
                  backgroundColor: variation.color,
                  pointerEvents: 'auto',
                }}
                title={variation.name}
                aria-label={`Select ${variation.name} variation`}
              />
            ))
          ) : (
            <div className="h-5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalGlassCard;
export type { Product, Variation, MinimalGlassCardProps };
