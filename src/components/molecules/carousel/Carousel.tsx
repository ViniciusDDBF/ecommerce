import type { CarouselProps, PositionX } from '../../../types';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../atoms';
import { CarouselProductCard } from '../../molecules';

export const Carousel = ({ data, className = '' }: CarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProducts, setSelectedProducts] = useState<{
    [carouselId: string]: { [groupIndex: number]: number };
  }>({});

  const normalizedData = Array.isArray(data) ? data : data ? [data] : [];
  const sortedCarousels = normalizedData.sort(
    (a, b) => (a.carousel_display_order || 0) - (b.carousel_display_order || 0),
  );

  const scroll = (direction: PositionX) => {
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
              className={`mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between`}
            >
              <h2 className="from-charcoal-200 to-charcoal-50 mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent sm:mb-0 sm:text-3xl">
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
              className={`flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden`}
              role="region"
              aria-label={`${carousel.carousel_title} carousel`}
            >
              {carousel.products.map((groupVariants, groupIndex) => {
                const selectedVariantId =
                  selectedProducts[carousel.carousel_name]?.[groupIndex] ||
                  groupVariants[0]?.variant_id;

                const cardId = `${carousel.carousel_name}-${groupIndex}`;

                return (
                  <CarouselProductCard
                    key={cardId}
                    variants={groupVariants}
                    selectedVariantId={selectedVariantId}
                    onVariantSelect={(variantId) =>
                      handleProductSelect(
                        carousel.carousel_name,
                        groupIndex,
                        variantId,
                      )
                    }
                    cardId={cardId}
                  />
                );
              })}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export type { CarouselProps };
