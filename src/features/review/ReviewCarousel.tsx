import type { FC, ReviewCarouselProps, TPositionX } from '@/types';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/atoms';

export const ReviewCarousel: FC<ReviewCarouselProps> = ({
  reviews,
  openReviewModal,
  className,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Calculate total media items
  const allMedia = reviews.flatMap((item) => item.media);
  const totalItems = allMedia.length;

  // Handle navigation
  const scroll = (direction: TPositionX) => {
    if (scrollRef.current) {
      const cardWidth =
        window.innerWidth < 640
          ? window.innerWidth * 0.8
          : window.innerWidth < 768
            ? window.innerWidth * 0.4
            : window.innerWidth < 1024
              ? window.innerWidth * 0.25
              : window.innerWidth * 0.2;
      const gap = window.innerWidth < 640 ? 16 : 24; // gap-4 (16px) or gap-6 (24px) for sm+
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      // Update currentIndex for dot indicators
      const newIndex =
        direction === 'left'
          ? Math.max(currentIndex - 1, 0)
          : Math.min(currentIndex + 1, totalItems - 1);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className={`bg-charcoal-800 py-8 md:py-12 ${className}`}>
      <div className="mb-6 flex justify-center md:mb-8">
        <h1 className="text-charcoal-50 text-xl md:text-2xl">
          Images and videos from customers
        </h1>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* ---------- Carousel Container ---------- */}
        <div className="bg-charcoal-700 glass-effect mx-auto mb-8 overflow-hidden rounded-2xl p-4 sm:p-6 md:p-8">
          <section
            ref={scrollRef}
            aria-label="Review media carousel"
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth sm:gap-6"
          >
            {reviews.map((item1) =>
              item1.media.map((item2, idx) => (
                <button
                  key={item2.id}
                  className="group relative h-64 w-[80vw] flex-shrink-0 cursor-pointer snap-center sm:w-[40vw] md:h-80 md:w-[25vw] lg:w-[20vw]"
                  onClick={() => openReviewModal(item1, idx, true)}
                  type="button"
                >
                  {item2.media_type === 'video' ? (
                    <video
                      className="h-full w-full rounded-xl object-cover object-center transition-transform duration-300"
                      controls={false}
                      muted
                      preload="metadata"
                      src={item2.url}
                    />
                  ) : (
                    <img
                      alt={`Review img ${item2.id}`}
                      className="h-full w-full rounded-xl object-cover object-center transition-transform duration-300"
                      src={item2.url}
                    />
                  )}
                  <div className="bg-gradient-charcoal absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-30" />
                </button>
              )),
            )}
          </section>
        </div>

        {/* ---------- Navigation Buttons ---------- */}
        {totalItems > 1 && (
          <div className="mt-4 flex items-center justify-between md:mt-6">
            <Button
              disabled={totalItems <= 1}
              onClick={() => scroll('left')}
              size="sm"
              startIcon={
                <ChevronLeft className="text-charcoal-300 group-hover:text-ember-400 h-5 w-5" />
              }
              variant="outline"
            />

            <Button
              disabled={totalItems <= 1}
              onClick={() => scroll('right')}
              size="sm"
              startIcon={
                <ChevronRight className="text-charcoal-300 group-hover:text-ember-400 h-5 w-5" />
              }
              variant="outline"
            />
          </div>
        )}
      </div>

      {/* ---------- Custom CSS for hiding scrollbar (Tailwind doesn't cover this fully) ---------- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
