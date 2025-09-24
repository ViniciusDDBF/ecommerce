import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

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

interface CarouselItem {
  carousel_name: string;
  carousel_title: string;
  carousel_display_order: number | null;
  products: ProductItem[][];
}

interface CompactCarouselProps {
  data: CarouselItem[] | CarouselItem;
  className?: string;
  headerClassName?: string;
  containerClassName?: string;
}

const CompactCarousel = ({
  data,
  className = '',
  headerClassName = '',
  containerClassName = '',
}: CompactCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProducts, setSelectedProducts] = useState<{
    [carouselId: string]: { [groupIndex: number]: number };
  }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
  const sortedCarousels = normalizedData.sort(
    (a, b) => (a.carousel_display_order || 0) - (b.carousel_display_order || 0),
  );

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 640 ? window.innerWidth * 0.8 : 320;
      const gap = window.innerWidth < 640 ? 16 : 24;
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleProductSelect = (
    carouselName: string,
    groupIndex: number,
    variantId: number,
  ) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [carouselName]: {
        ...prev[carouselName],
        [groupIndex]: variantId,
      },
    }));
  };

  return (
    <>
      {sortedCarousels.length === 0 ? (
        <div className="text-charcoal-300 py-4 text-center">
          No carousels available
        </div>
      ) : (
        sortedCarousels.map((carousel) => (
          <div
            key={carousel.carousel_name}
            className={`bg-charcoal-700 mx-auto mb-8 rounded-2xl p-4 sm:p-6 md:p-8 ${className}`}
          >
            <div
              className={`mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between ${headerClassName}`}
            >
              <h2 className="from-ember-400 to-ember-500 mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:mb-0 sm:text-3xl">
                {carousel.carousel_title}
              </h2>
              <div className="flex gap-2 self-end sm:self-auto">
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<ChevronLeft size={16} />}
                  onClick={() => scroll('left')}
                  className="p-2 sm:p-3"
                />
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<ChevronRight size={16} />}
                  onClick={() => scroll('right')}
                  className="p-2 sm:p-3"
                />
              </div>
            </div>

            <div
              ref={scrollRef}
              className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${containerClassName}`}
              role="region"
              aria-label={`${carousel.carousel_title} carousel`}
            >
              {carousel.products.map((groupVariants, groupIndex) => {
                const selectedVariantId =
                  selectedProducts[carousel.carousel_name]?.[groupIndex] ||
                  groupVariants[0]?.variant_id;
                const selectedVariant =
                  groupVariants.find(
                    (p) => p.variant_id === selectedVariantId,
                  ) || groupVariants[0];

                const isOnSale =
                  selectedVariant.promotion_id !== null ||
                  selectedVariant.current_price <
                    selectedVariant.original_price;

                const slug =
                  selectedVariant.product_slug ||
                  (selectedVariant.variant_name
                    ? selectedVariant.variant_name
                        .toLowerCase()
                        .replace(/\s+/g, '-')
                    : `product-${selectedVariant.variant_id}`);

                const cardId = `${carousel.carousel_name}-${groupIndex}`;
                const isHovered = hoveredCard === cardId;
                const primaryImage =
                  selectedVariant.image_url?.[0] || '/images/placeholder.jpg';
                const hoverImage =
                  selectedVariant.image_url?.[1] || primaryImage;
                const hasHoverImage = hoverImage !== primaryImage;

                return (
                  <div
                    key={cardId}
                    className="relative w-[80vw] flex-shrink-0 snap-center sm:w-[320px]"
                  >
                    <Link to={`/products/${slug}`}>
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
                              isHovered && hasHoverImage
                                ? 'opacity-0'
                                : 'opacity-100'
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
                          <span className="bg-ember-500 text-charcoal-50 absolute top-2 left-2 rounded px-2 py-1 text-xs font-bold">
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
                    </Link>

                    <div className="mt-2 flex justify-center gap-2 sm:gap-3">
                      {groupVariants.map((variant) => (
                        <button
                          key={variant.variant_id}
                          onClick={() =>
                            handleProductSelect(
                              carousel.carousel_name,
                              groupIndex,
                              variant.variant_id,
                            )
                          }
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
              })}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default CompactCarousel;
export type { CompactCarouselProps };
