import { useNavigate } from 'react-router';
import { User, MapPin, Package, Heart } from 'lucide-react';

export default function AccountDefault() {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      desc: 'Update your personal information, email, and preferences.',
    },
    {
      id: 'addresses',
      label: 'Addresses',
      icon: MapPin,
      desc: 'Add, edit, or remove shipping and billing addresses.',
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Package,
      desc: 'Track current orders and view your purchase history.',
    },
    {
      id: 'wishlist',
      label: 'Wishlist',
      icon: Heart,
      desc: 'Manage your saved items and favorites.',
    },
  ];

  return (
    <div className="glass-effect mx-auto max-w-7xl rounded-xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
      <h2 className="text-gradient-ember mb-3 text-xl font-bold sm:mb-4 sm:text-2xl md:text-3xl">
        Welcome to Your Account
      </h2>
      <p className="text-charcoal-300 mb-6 text-sm sm:mb-8 sm:text-base">
        From here, you can manage your profile, track orders, update addresses,
        curate your wishlist, and handle security settings. Select a section
        below to get started.
      </p>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/account/${item.id}`)}
              className="glass-effect ember-transition hover:ember-hover-border hover:animate-glow cursor-pointer rounded-lg p-4 sm:p-6"
            >
              <Icon
                size={24}
                className="text-ember-500 drop-shadow-ember mb-3 sm:mb-4 sm:size-28 md:size-32"
              />
              <h3 className="text-ember-400 mb-2 text-base font-semibold sm:text-lg md:text-xl">
                {item.label}
              </h3>
              <p className="text-charcoal-300 text-sm sm:text-base">
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
