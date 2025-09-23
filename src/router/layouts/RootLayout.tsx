import { Outlet, useNavigation } from 'react-router';
import Header from '../../components/Header';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Truck, Shield, RotateCcw } from 'lucide-react';

export default function RootLayout() {
  const navigation = useNavigation();
  const isLoading =
    navigation.state === 'loading' || navigation.state === 'submitting';

  return (
    <div className="bg-charcoal-900">
      {isLoading && <LoadingOverlay />}
      <Header />

      <>
        <Outlet />
      </>

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
      {/* Footer */}
      <footer className="bg-charcoal-800 text-charcoal-400 px-6 py-6 text-center">
        © 2025 EmberTech. All rights reserved.
      </footer>
    </div>
  );
}
