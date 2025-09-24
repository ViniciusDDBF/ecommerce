import { ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Carousel from '../components/Carousel';
import CinematicTitle from '../components/CinematicTitle';
import { useLoaderData } from 'react-router-dom';
const Homepage = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <>
      {/* ---------- Main banner ---------- */}
      <section className="bg-charcoal-800 relative mb-10 flex h-[80vh] overflow-hidden">
        {/* ---------- Image ---------- */}
        <div className="relative h-full flex-[2]">
          <img
            src="https://niihlyofonxtmzgzanpv.supabase.co/storage/v1/object/public/loja-do-vini/banners/homePage/Miauzinho.png"
            alt="Hero"
            className="h-full w-full rounded-lg object-cover grayscale-20"
          />

          {/* ---------- Overlay ---------- */}
          <div className="absolute inset-0 z-10 block bg-black/50 sm:hidden sm:bg-gradient-to-r sm:from-black/70 sm:to-transparent">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-5">
                <CinematicTitle text="Luxury Redefined" />
                <p className="text-charcoal-100 mb-8 text-center text-lg leading-relaxed">
                  Discover premium products crafted for the discerning
                  individual. Where sophistication meets innovation.
                </p>
                <Button size="md" text="Explore Collection" />
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Content ---------- */}
        <div className="relative z-20 hidden flex-[1] items-center justify-center sm:flex">
          <div className="max-w-md text-left">
            <CinematicTitle text="Luxury Redefined" />

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

      {/* ---------- Carousel ---------- */}
      {data && <Carousel data={data} />}
    </>
  );
};

export default Homepage;
