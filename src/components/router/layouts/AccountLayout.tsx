import { useState } from 'react';
import { User, MapPin, Package, Heart, Lock, Menu, X } from 'lucide-react';
import Button from '../../Button';
import AccountProfile from '../../account/AccountProfile';
import AccountOrders from '../../account/AccountOrders';
import AccountWishlist from '../../account/AccountWishlist';
import AccountAddresses from '../../account/AccountAddresses';
import { useNavigate, useParams } from 'react-router';
import AccountDefault from '../../account/AccountDefault';

const ChangePassword = () => (
  <div className="glass-effect text-charcoal-200 rounded-xl p-6">
    Change Password Component
  </div>
);

export default function AccountLayout() {
  const { section } = useParams<{ section?: string }>();
  const [activeSection, setActiveSection] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'password', label: 'Security', icon: Lock },
  ];

  const renderContent = () => {
    switch (section) {
      case 'profile':
        return <AccountProfile />;
      case 'addresses':
        return <AccountAddresses />;
      case 'orders':
        return <AccountOrders />;
      case 'wishlist':
        return <AccountWishlist />;
      case 'password':
        return <ChangePassword />;
      default:
        return <AccountDefault />;
    }
  };

  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-gradient-ember mb-2 text-3xl font-bold">
                My Account
              </h1>
              <p className="text-charcoal-300">
                Manage your account settings and preferences
              </p>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <Button
                text=""
                variant="secondary"
                size="sm"
                startIcon={
                  isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />
                }
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <div
            className={`lg:w-80 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="glass-effect sticky top-8 rounded-xl p-6">
              <h2 className="text-ember-400 mb-4 text-lg font-semibold">
                Account Menu
              </h2>
              <nav className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(`/account/${item.id}`);
                        if (section) setActiveSection(section);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`ember-transition flex w-full items-center space-x-3 rounded-lg px-4 py-3 text-left ${
                        section === item.id
                          ? 'bg-ember-500 text-white shadow-md'
                          : 'text-charcoal-200 hover:bg-charcoal-600 ember-hover-border'
                      }`}
                    >
                      <Icon size={20} className="flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="ember-transition">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
