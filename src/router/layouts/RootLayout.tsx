import { RotateCcw, Shield, Truck } from 'lucide-react';
import { Outlet, useNavigation } from 'react-router';
import { LoadingOverlay } from '@/components/atoms';
import { Header } from '@/features';

export const RootLayout = () => {
  const navigation = useNavigation();
  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting';

  return (
    <div className="bg-charcoal-800 min-h-screen">
      {isLoading && <LoadingOverlay />}
      <Header />

      <main className="bg-charcoal-800">
        <Outlet />
      </main>

      {/* ---------- Trust Badges ---------- */}
      <section className="bg-charcoal-800 py-8 sm:py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 md:gap-8">
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
                className="bg-charcoal-800 border-charcoal-600/30 rounded-xl border bg-gradient-to-br p-4 text-center backdrop-blur-xl transition-colors sm:p-6"
              >
                <Icon
                  className="text-charcoal-100 mx-auto mb-3 sm:mb-4"
                  size={24}
                />
                <h3 className="text-charcoal-100 mb-2 text-base font-semibold sm:text-lg">
                  {title}
                </h3>
                <p className="text-charcoal-300 text-sm sm:text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="bg-charcoal-800 text-charcoal-400 px-4 py-4 text-center text-sm sm:px-6 sm:py-6 sm:text-base">
        © Vinicius Dundich
      </footer>
    </div>
  );
};
