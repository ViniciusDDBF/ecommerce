import { useState, useRef, ReactNode } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Plus,
} from 'lucide-react';
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

// Minimal Glass Product Card - Optimized for Carousel
const MinimalGlassCard = ({ product }: { product: Product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const variations = product.variations || [];
  const selectedVariation = variations[selectedIndex] || {
    image: product.image,
    price: product.price,
  };

  const handleVariationClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent event bubbling to parent elements
    setSelectedIndex(index);
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
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
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
            <div className="h-5" /> // Placeholder to reserve space
          )}
        </div>
      </div>
    </div>
  );
};

// Scrollable Carousel Component - Updated for Minimal Glass Cards
const CompactCarousel = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle?: string;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const cardWidth = 320; // w-80 = 20rem = 320px (assuming 16px rem)
      const gap = 24; // gap-6 = 1.5rem = 24px
      const scrollAmount = cardWidth + gap;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="bg-charcoal-800 mx-auto mb-12 max-w-[95vw] rounded-2xl p-8">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="from-ember-400 to-ember-500 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
            {title}
          </h2>
          {subtitle && <p className="text-charcoal-400 mt-2">{subtitle}</p>}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 ember-transition rounded-lg p-2 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="bg-charcoal-600 text-charcoal-300 hover:bg-ember-500 hover:text-charcoal-50 ember-transition rounded-lg p-2 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {children}
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
};

// Main Homepage Component
const Homepage = () => {
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

  const trendingProducts: Product[] = [
    {
      id: 7,
      name: 'Minimalist Backpack with Extra Long Name for Testing Line Break',
      price: 159,
      rating: 4,
      reviews: 124,
      image:
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      variations: [
        {
          name: 'Black',
          color: '#1F1F1F',
          image:
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
          price: 159,
        },
        {
          name: 'Brown',
          color: '#8B4513',
          image:
            'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=300&fit=crop',
          price: 159,
        },
        {
          name: 'Navy',
          color: '#1e3a8a',
          image:
            'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=300&fit=crop',
          price: 169,
        },
      ],
    },
    {
      id: 8,
      name: 'Ceramic Mug Set',
      price: 49,
      originalPrice: 69,
      sale: 29,
      rating: 4,
      reviews: 89,
      image:
        'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
      variations: [
        {
          name: 'White',
          color: '#F8F8F8',
          image:
            'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop',
          price: 49,
        },
        {
          name: 'Sage',
          color: '#87A96B',
          image:
            'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&h=300&fit=crop',
          price: 49,
        },
        {
          name: 'Terracotta',
          color: '#C65D32',
          image:
            'https://images.unsplash.com/photo-1594736797933-d0851ba0a8ad?w=400&h=300&fit=crop',
          price: 54,
        },
      ],
    },
    {
      id: 9,
      name: 'LED Desk Lamp',
      price: 79,
      rating: 5,
      reviews: 201,
      image:
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    },
    {
      id: 10,
      name: 'Bluetooth Keyboard',
      price: 119,
      rating: 4,
      reviews: 178,
      image:
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
      variations: [
        {
          name: 'Space Gray',
          color: '#4A4A4A',
          image:
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
          price: 119,
        },
        {
          name: 'White',
          color: '#F8F8F8',
          image:
            'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop',
          price: 119,
        },
      ],
    },
    {
      id: 11,
      name: 'Coffee Grinder',
      price: 199,
      rating: 5,
      reviews: 267,
      image:
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop',
    },
    {
      id: 12,
      name: 'Smart Watch Pro',
      price: 299,
      originalPrice: 399,
      sale: 25,
      rating: 5,
      reviews: 342,
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
      variations: [
        {
          name: 'Midnight',
          color: '#1F1F1F',
          image:
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
          price: 299,
        },
        {
          name: 'Silver',
          color: '#C0C0C0',
          image:
            'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop',
          price: 299,
        },
        {
          name: 'Gold',
          color: '#FFD700',
          image:
            'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=300&fit=crop',
          price: 329,
        },
        {
          name: 'Rose Gold',
          color: '#E8B4B8',
          image:
            'https://images.unsplash.com/photo-1579586337278-3f436f25d4d3?w=400&h=300&fit=crop',
          price: 329,
        },
      ],
    },
    {
      id: 13,
      name: 'Wireless Headphones',
      price: 179,
      rating: 4,
      reviews: 156,
      image:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
      variations: [
        {
          name: 'Black',
          color: '#1F1F1F',
          image:
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
          price: 179,
        },
        {
          name: 'White',
          color: '#F8F8F8',
          image:
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop',
          price: 179,
        },
        {
          name: 'Red',
          color: '#DC2626',
          image:
            'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&h=300&fit=crop',
          price: 189,
        },
      ],
    },
  ];

  return (
    <div className="bg-charcoal-900 min-h-screen">
      {/* Category Bar */}
      <section className="from-charcoal-800/80 to-charcoal-900/80 border-charcoal-700/30 sticky top-0 z-40 border-b bg-gradient-to-br py-6 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="flex justify-center gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <Button
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

      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal-900/60 to-charcoal-800/40 absolute inset-0 bg-gradient-to-br"></div>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-charcoal-50 mb-6 text-6xl font-bold md:text-8xl">
            Luxury{' '}
            <span className="from-ember-400 to-ember-500 bg-gradient-to-r bg-clip-text text-transparent">
              Redefined
            </span>
          </h1>
          <p className="text-charcoal-200 mx-auto mb-8 max-w-2xl text-xl">
            Discover premium products crafted for the discerning individual.
            Where sophistication meets innovation.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              text="Explore Collection"
              variant="primary"
              size="lg"
              className="animate-glow"
              endIcon={<ArrowRight size={20} />}
            />
            <Button text="Watch Story" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[95vw] px-6">
        {/* Trending Now - Minimal Glass Cards */}
        <CompactCarousel
          title="Trending Now"
          subtitle="Most popular items this week"
        >
          {trendingProducts.map((product) => (
            <MinimalGlassCard key={product.id} product={product} />
          ))}
        </CompactCarousel>
      </div>

      {/* Trust Badges */}
      <section className="bg-charcoal-800 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Shield,
                title: 'Secure Payment',
                desc: 'Your transactions are protected',
              },
              {
                icon: Truck,
                title: 'Free Shipping',
                desc: 'On orders over $200',
              },
              {
                icon: RotateCcw,
                title: '30-Day Returns',
                desc: 'Hassle-free returns',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="from-charcoal-700/80 to-charcoal-800/80 border-charcoal-600/30 hover:border-ember-400/30 ember-transition rounded-xl border bg-gradient-to-br p-6 text-center backdrop-blur-xl"
              >
                <Icon className="text-ember-400 mx-auto mb-4" size={32} />
                <h3 className="text-charcoal-200 mb-2 text-lg font-semibold">
                  {title}
                </h3>
                <p className="text-charcoal-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
