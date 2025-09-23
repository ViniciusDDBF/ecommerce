import { useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CompactCarouselProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  cardWidth?: number;
  gap?: number;
  className?: string;
  headerClassName?: string;
  containerClassName?: string;
}

const CompactCarousel = ({
  children,
  title,
  subtitle,
  cardWidth = 320, // Default width for w-80 cards
  gap = 24, // Default gap-6
  className = '',
  headerClassName = '',
  containerClassName = '',
}: CompactCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    direction: 'left' | 'right',
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      scroll(direction);
    }
  };

  return (
    <div
      className={`bg-charcoal-800 mx-auto mb-12 max-w-[95vw] rounded-2xl p-8 ${className}`}
    >
      <div className={`mb-6 flex items-end justify-between ${headerClassName}`}>
        <div>
          <h2 className="from-ember-400 to-ember-500 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            {title}
          </h2>
          {subtitle && <p className="text-charcoal-400 mt-2">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            onKeyDown={(e) => handleKeyDown(e, 'left')}
            className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 ember-transition focus:ring-ember-400 focus:ring-offset-charcoal-800 rounded-lg p-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Scroll carousel left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            onKeyDown={(e) => handleKeyDown(e, 'right')}
            className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 ember-transition focus:ring-ember-400 focus:ring-offset-charcoal-800 rounded-lg p-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none"
            aria-label="Scroll carousel right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${containerClassName}`}
        role="region"
        aria-label={`${title} carousel`}
      >
        {children}
      </div>
    </div>
  );
};

export default CompactCarousel;
export type { CompactCarouselProps };
