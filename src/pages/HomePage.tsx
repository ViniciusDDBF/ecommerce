import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import MinimalGlassCard, {
  type Product,
  type Variation,
} from '../components/ProductCard';
import CompactCarousel from '../components/Carousel';
import CinematicTitle from '../components/CinematicTitle';
import CustomSelect from '../components/form/CustomSelect';
import { CustomCheckbox } from '../components/form/CustomCheckbox';

const Homepage = () => {
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

  // Event handlers
  const handleAddToCart = (product: Product, selectedVariation?: Variation) => {
    console.log('Adding to cart:', product, selectedVariation);
    // Add your cart logic here
  };

  const handleToggleFavorite = (product: Product, isLiked: boolean) => {
    console.log('Toggling favorite:', product.name, isLiked);
    // Add your favorites logic here
  };

  return (
    <div className="bg-charcoal-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative flex h-[70vh] items-center justify-center overflow-hidden">
        <div className="from-charcoal-900/60 to-charcoal-800/40 absolute inset-0 bg-gradient-to-br"></div>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=800&fit=crop"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <CinematicTitle
            text="Luxury Redefined"
            className="mb-6 text-6xl font-bold md:text-8xl"
          />

          <p className="text-charcoal-200 mx-auto mb-8 max-w-2xl text-xl">
            Discover premium products crafted for the discerning individual.
            Where sophistication meets innovation.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              text="Explore Collection"
              variant="primary"
              size="lg"
              endIcon={<ArrowRight size={20} />}
            />
            <Button text="Watch Story" variant="outline" size="lg" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[95vw] px-6">
        {/* Trending Now - Using extracted components */}
        <CompactCarousel
          title="Trending Now"
          subtitle="Most popular items this week"
        >
          {trendingProducts.map((product) => (
            <MinimalGlassCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </CompactCarousel>

        {/* You can easily add more carousels now */}
        <CompactCarousel
          title="Featured Products"
          subtitle="Hand-picked by our curators"
        >
          {trendingProducts.slice(0, 4).map((product) => (
            <MinimalGlassCard
              key={`featured-${product.id}`}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </CompactCarousel>
      </div>
    </div>
  );
};

export default Homepage;
