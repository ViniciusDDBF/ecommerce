// #region /* ---------- Imports ---------- */
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// #endregion

// #region /* ---------- Types ---------- */
interface ProductItem {
  group_id: number;
  product_name: string;
  product_slug: string | null;
  variant_id: number;
  variant_name: string;
  current_price: number;
  original_price: number;
  stock: number;
  image_url: string[] | null; // Expects an array of image URLs
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
  cardWidth?: number;
  gap?: number;
  className?: string;
  headerClassName?: string;
  containerClassName?: string;
}
// #endregion

const CompactCarousel = ({
  data,
  cardWidth = 320,
  gap = 24,
  className = '',
  headerClassName = '',
  containerClassName = '',
}: CompactCarouselProps) => {
  // #region /* ---------- Hooks ---------- */
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProducts, setSelectedProducts] = useState<{
    [carouselId: string]: { [groupIndex: number]: number };
  }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null); // Track hovered image
  // #endregion

  // #region /* ---------- Data Normalization and Sorting ---------- */
  const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
  const sortedCarousels = normalizedData.sort(
    (a, b) => (a.carousel_display_order || 0) - (b.carousel_display_order || 0),
  );
  // #endregion

  // #region /* ---------- Scroll Functionality ---------- */
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };
  // #endregion

  // #region /* ---------- Variant Selection ---------- */
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
  // #endregion

  return (
    <>
      {/* ---------- Carousel List ---------- */}
      {sortedCarousels.length === 0 ? (
        <div className="text-charcoal-300 text-center">
          No carousels available
        </div>
      ) : (
        sortedCarousels.map((carousel) => (
          <div
            key={carousel.carousel_name}
            className={`bg-charcoal-700 mx-auto mb-12 max-w-[95vw] rounded-2xl p-8 ${className}`}
          >
            {/* ---------- Carousel Header ---------- */}
            <div
              className={`mb-6 flex items-end justify-between ${headerClassName}`}
            >
              <div>
                <h2 className="from-ember-400 to-ember-500 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                  {carousel.carousel_title}
                </h2>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => scroll('left')}
                  className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 focus:ring-ember-400 focus:ring-offset-charcoal-800 rounded-lg p-2 transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  aria-label="Scroll carousel left"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scroll('right')}
                  className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 focus:ring-ember-400 focus:ring-offset-charcoal-800 focus-ring-offset-2 rounded-lg p-2 transition focus:ring-2 focus:ring-offset-2 focus:outline-none"
                  aria-label="Scroll carousel right"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* ---------- Carousel Content ---------- */}
            <div
              ref={scrollRef}
              className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${containerClassName}`}
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
                    className="relative flex-shrink-0 snap-center"
                    style={{ width: `${cardWidth}px` }}
                  >
                    {/* ---------- Product Card ---------- */}
                    <Link to={`/products/${slug}`}>
                      <div className="bg-charcoal-800 relative overflow-hidden rounded-lg">
                        <div
                          className="relative"
                          onMouseEnter={() => setHoveredCard(cardId)}
                          onMouseLeave={() => setHoveredCard(null)}
                        >
                          {/* Primary Image */}
                          <img
                            src={primaryImage}
                            alt={selectedVariant.product_name || 'Product'}
                            className={`h-full w-full object-contain transition-opacity duration-500 ease-in-out ${
                              isHovered && hasHoverImage
                                ? 'opacity-0'
                                : 'opacity-100'
                            }`}
                          />

                          {/* Hover Image (only if different from primary) */}
                          {hasHoverImage && (
                            <img
                              src={hoverImage}
                              alt={selectedVariant.product_name || 'Product'}
                              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${
                                isHovered ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          )}
                        </div>

                        {/* ---------- Sale Badge ---------- */}
                        {isOnSale && (
                          <span className="bg-ember-500 text-charcoal-50 absolute top-2 left-2 rounded px-2 py-1 text-xs font-bold">
                            Sale
                          </span>
                        )}
                        <div className="p-4">
                          <h3 className="text-charcoal-100 text-lg font-semibold">
                            {selectedVariant.product_name || 'Unknown Product'}
                          </h3>

                          <div className="mt-2 flex items-center gap-2">
                            <span className="text-ember-400 font-bold">
                              ${selectedVariant.current_price.toFixed(2)}
                            </span>
                            {isOnSale && (
                              <span className="text-charcoal-400 text-sm line-through">
                                ${selectedVariant.original_price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          {selectedVariant.stock === 0 && (
                            <span className="mt-2 block text-sm text-red-500">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>

                    {/* ---------- Variant Selector ---------- */}
                    <div className="mt-2 flex justify-center gap-3">
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
                          className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            variant.variant_id === selectedVariantId
                              ? 'ring-ember-400 ring-offset-charcoal-700 scale-110 ring-2 ring-offset-2'
                              : 'cursor-pointer hover:scale-110'
                          } ${variant.stock === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
                          style={{
                            backgroundColor:
                              variant.color && variant.color !== 'Unknown'
                                ? variant.color
                                : '#cccccc',
                          }}
                          disabled={variant.stock === 0}
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
