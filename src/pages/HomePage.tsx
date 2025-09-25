import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Carousel from '../components/carousel/Carousel';
import CinematicTitle from '../components/CinematicTitle';
import { useLoaderData } from 'react-router-dom';

const Homepage = () => {
  const data = useLoaderData();

  return (
    <>
      {/* ---------- Main banner ---------- */}
      <section className="bg-charcoal-800 relative mb-6 flex h-[60vh] flex-col overflow-hidden sm:mb-8 sm:h-[70vh] sm:flex-row md:mb-10 md:h-[80vh]">
        {/* ---------- Image ---------- */}
        <div className="relative h-[70vh] sm:h-full sm:flex-[2]">
          <img
            src="https://niihlyofonxtmzgzanpv.supabase.co/storage/v1/object/public/loja-do-vini/banners/homePage/Miauzinho.png"
            alt="Hero"
            className="h-full w-full object-cover grayscale-20"
          />

          {/* ---------- Overlay for Mobile ---------- */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 sm:hidden">
            <div className="flex flex-col items-center justify-center gap-3 px-4">
              <CinematicTitle
                text="Luxury Redefined"
                className="text-4xl sm:text-6xl"
              />
              <p className="text-charcoal-100 max-w-xs text-center text-sm leading-relaxed sm:text-base">
                Discover premium products crafted for the discerning individual.
                Where sophistication meets innovation.
              </p>
              <Button size="sm" text="Explore Collection" className="mt-2" />
            </div>
          </div>
        </div>

        {/* ---------- Content for Larger Screens ---------- */}
        <div className="relative hidden items-center justify-center sm:flex sm:flex-[1]">
          <div className="max-w-md px-4 text-left sm:px-6">
            <CinematicTitle
              text="Luxury Redefined"
              className="text-2xl md:text-3xl"
            />
            <p className="text-charcoal-100 mb-6 text-base leading-relaxed md:text-lg">
              Discover premium products crafted for the discerning individual.
              Where sophistication meets innovation.
            </p>
            <Button
              text="Explore Collection"
              variant="primary"
              size="md"
              endIcon={<ArrowRight size={18} />}
              className="sm:px-4 sm:py-2"
            />
          </div>
        </div>
      </section>

      {/* ---------- Carousel ---------- */}
      {data && <Carousel data={data} />}
    </>
  );
};

export default Homepage;
