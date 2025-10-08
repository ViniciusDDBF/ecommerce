import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button, Modal } from '@/components/atoms';
import { Carousel } from '@/components/molecules';

export const Homepage = () => {
  const data = useLoaderData();
  const [wipIsOpen, setWipIsOpen] = useState<boolean>(false);
  return (
    <>
      {/* ---------- Main banner ---------- */}
      <section className="bg-charcoal-800 relative mb-6 flex h-[60vh] flex-col overflow-hidden sm:mb-8 sm:h-[70vh] sm:flex-row md:mb-10 md:h-[80vh]">
        {/* ---------- Image ---------- */}
        <div className="relative h-[70vh] sm:h-full sm:flex-[2]">
          <img
            alt="Hero"
            className="h-full w-full object-cover grayscale-20"
            src="https://niihlyofonxtmzgzanpv.supabase.co/storage/v1/object/public/loja-do-vini/banners/homePage/Miauzinho.png"
          />

          {/* ---------- Overlay for Mobile ---------- */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 sm:hidden">
            <div className="flex flex-col items-center justify-center gap-3 px-4">
              <h2 className="text-charcoal-50 text-3xl">Luxury Redefined</h2>
              <p className="text-charcoal-200 max-w-xs text-center text-sm leading-relaxed sm:text-base">
                Discover premium products crafted for the discerning individual.
                Where sophistication meets innovation.
              </p>
              <Button
                className="mt-2"
                onClick={() => {
                  setWipIsOpen(true);
                }}
                size="sm"
                text="Explore Collection"
              />
            </div>
          </div>
        </div>

        {/* ---------- Content for Larger Screens ---------- */}
        <div className="relative hidden items-center justify-center sm:flex sm:flex-[1]">
          <div className="max-w-md px-4 text-left sm:px-6">
            <h2 className="text-charcoal-50 text-3xl">Luxury Redefined</h2>
            <p className="text-charcoal-200 mb-6 text-base leading-relaxed md:text-lg">
              Discover premium products crafted for the discerning individual.
              Where sophistication meets innovation.
            </p>
            <Button
              className="sm:px-4 sm:py-2"
              endIcon={<ArrowRight size={18} />}
              onClick={() => {
                setWipIsOpen(true);
              }}
              size="md"
              text="Explore Collection"
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* ---------- Carousel ---------- */}
      {data && <Carousel data={data} />}

      <Modal
        buttons={{
          cancel: {
            text: 'OK',
            onClick() {
              setWipIsOpen(false);
            },
          },
        }}
        isOpen={wipIsOpen}
        message="I'm still developing this feature!"
        title="WIP"
      />
    </>
  );
};
