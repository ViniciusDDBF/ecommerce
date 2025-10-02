import { useState } from 'react';

interface ProductItem {
  group_id: number;
  product_name: string;
  product_slug: string | null;
  variant_id: number;
  variant_name: string;
  current_price: number;
  original_price: number;
  stock: number;
  image_url: string[] | null;
  promotion_id: number | null;
  color: string | null;
}

interface ProductCardProps {
  variants: ProductItem[];
  selectedVariantId: number;
  onVariantSelect: (variantId: number) => void;
  cardId: string;
}

export const CarouselProductCard = ({
  variants,
  selectedVariantId,
  onVariantSelect,
  cardId,
}: ProductCardProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const selectedVariant =
    variants.find((p) => p.variant_id === selectedVariantId) || variants[0];

  const isOnSale =
    selectedVariant.promotion_id !== null ||
    selectedVariant.current_price < selectedVariant.original_price;

  const slug =
    selectedVariant.product_slug ||
    (selectedVariant.variant_name
      ? selectedVariant.variant_name.toLowerCase().replace(/\s+/g, '-')
      : `product-${selectedVariant.variant_id}`);

  const isHovered = hoveredCard === cardId;
  const primaryImage =
    selectedVariant.image_url?.[0] || '/images/placeholder.jpg';
  const hoverImage = selectedVariant.image_url?.[1] || primaryImage;
  const hasHoverImage = hoverImage !== primaryImage;

  return (
    <div className="relative w-[80vw] flex-shrink-0 snap-center sm:w-[320px]">
      <a href={`/products/${slug}`}>
        <div className="bg-charcoal-800 relative overflow-hidden rounded-lg">
          <div
            className="relative aspect-[3/4] sm:aspect-[4/5]"
            onMouseEnter={() => setHoveredCard(cardId)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <img
              src={primaryImage}
              alt={selectedVariant.product_name || 'Product'}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out ${
                isHovered && hasHoverImage ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {hasHoverImage && (
              <img
                src={hoverImage}
                alt={selectedVariant.product_name || 'Product'}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-in-out ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </div>

          {isOnSale && (
            <span className="bg-ember-500 text-charcoal-50 absolute top-0 left-0 px-2 py-1 text-xs font-bold">
              Sale
            </span>
          )}
          <div className="p-3 sm:p-4">
            <h3 className="text-charcoal-100 truncate text-base font-semibold sm:text-lg">
              {selectedVariant.product_name || 'Unknown Product'}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-ember-400 text-sm font-bold sm:text-base">
                ${selectedVariant.current_price.toFixed(2)}
              </span>
              {isOnSale && (
                <span className="text-charcoal-400 text-xs line-through sm:text-sm">
                  ${selectedVariant.original_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </a>

      <div className="mt-2 flex justify-center gap-2 sm:gap-3">
        {variants.map((variant) => (
          <button
            key={variant.variant_id}
            onClick={() => onVariantSelect(variant.variant_id)}
            className={`h-4 w-4 rounded-full transition-all duration-300 sm:h-3 sm:w-3 ${
              variant.variant_id === selectedVariantId
                ? 'ring-ember-400 ring-offset-charcoal-700 scale-110 ring-2 ring-offset-2'
                : 'cursor-pointer hover:scale-110'
            } `}
            style={{
              backgroundColor:
                variant.color && variant.color !== 'Unknown'
                  ? variant.color
                  : '#cccccc',
            }}
            aria-label={`Select ${variant.variant_name || 'variant'}`}
          />
        ))}
      </div>
    </div>
  );
};

export type { ProductCardProps, ProductItem };
