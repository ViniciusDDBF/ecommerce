import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import CompactCarousel from '../components/Carousel';
import CinematicTitle from '../components/CinematicTitle';
import { useLoaderData } from 'react-router-dom';
const Homepage = () => {
  const data = useLoaderData();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-charcoal-800 relative mb-10 flex h-[80vh] overflow-hidden">
        {/* Left Side - Image */}
        <div className="relative h-full flex-[2]">
          <img
            src="https://niihlyofonxtmzgzanpv.supabase.co/storage/v1/object/public/loja-do-vini/banners/homePage/Miauzinho.png"
            alt="Hero"
            className="h-full w-full rounded-lg object-cover grayscale-20"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-[1] items-center justify-center">
          <div className="max-w-md text-left">
            <CinematicTitle
              text="Luxury Redefined"
              className="mb-6 text-4xl font-bold md:text-6xl"
            />

            <p className="text-charcoal-100 mb-8 text-lg leading-relaxed">
              Discover premium products crafted for the discerning individual.
              Where sophistication meets innovation.
            </p>

            <div className="flex">
              <Button
                text="Explore Collection"
                variant="primary"
                size="lg"
                endIcon={<ArrowRight size={20} />}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[95vw]">
        {/* Trending Now - Using extracted components */}

        {data && <CompactCarousel data={data} />}
      </div>
    </>
  );
};

export default Homepage;
