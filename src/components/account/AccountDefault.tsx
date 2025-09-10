import { useNavigate } from 'react-router';
import { User, MapPin, Package, Heart, Lock } from 'lucide-react';

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
    {
      id: 'password',
      label: 'Security',
      icon: Lock,
      desc: 'Change password and manage account security settings.',
    },
  ];

  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-gradient-ember mb-4 text-2xl font-bold">
        Welcome to Your Account
      </h2>
      <p className="text-charcoal-300 mb-8">
        From here, you can manage your profile, track orders, update addresses,
        curate your wishlist, and handle security settings. Select a section
        below to get started.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => navigate(`/account/${item.id}`)}
              className="glass-effect ember-transition hover:ember-hover-border hover:animate-glow cursor-pointer rounded-lg p-6"
            >
              <Icon
                size={32}
                className="text-ember-500 drop-shadow-ember mb-4"
              />
              <h3 className="text-ember-400 mb-2 text-xl font-semibold">
                {item.label}
              </h3>
              <p className="text-charcoal-300">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
