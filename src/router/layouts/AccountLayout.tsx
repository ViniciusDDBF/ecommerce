import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { User, MapPin, Package, Heart, Menu, X } from 'lucide-react';
import Button from '../../components/atoms/Button';
import AccountProfile from '../../features/account/AccountProfile';
import AccountOrders from '../../features/account/AccountOrders';
import AccountWishlist from '../../features/account/AccountWishlist';
import AccountAddresses from '../../features/account/AccountAddresses';
import AccountDefault from '../../features/account/AccountDefault';

export default function AccountLayout() {
  const { section } = useParams<{ section?: string }>();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'orders', label: 'Orders', icon: Package },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
  ];

  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-6 md:px-8">
        {/* ---------- Header ---------- */}
        <div className="mb-6 flex items-center justify-between sm:mb-8">
          {/* ---------- Mobile Menu Toggle ---------- */}
          <div className="lg:hidden">
            <Button
              text=""
              variant="secondary"
              size="xs"
              startIcon={
                isMobileMenuOpen ? (
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
                )
              }
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 sm:p-3"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
          {/* ---------- Sidebar Navigation ---------- */}
          <div
            className={`lg:w-64 xl:w-80 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}
          >
            <div className="glass-effect sticky top-4 rounded-xl p-4 sm:top-6 sm:p-6">
              <h2 className="text-ember-400 mb-3 text-base font-semibold sm:mb-4 sm:text-lg md:text-xl">
                Account Menu
              </h2>
              <nav className="space-y-1 sm:space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (section === item.id) return;
                        navigate(`/account/${item.id}`);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`ember-transition flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-sm sm:space-x-3 sm:px-4 sm:py-3 sm:text-base ${
                        section === item.id
                          ? 'bg-ember-500 text-white shadow-md'
                          : 'text-charcoal-200 hover:bg-charcoal-600 hover:ember-hover-border'
                      }`}
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* ---------- Main Content Area ---------- */}
          <div className="flex-1">
            <div className="ember-transition">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );

  function renderContent() {
    switch (section) {
      case 'profile':
        return <AccountProfile />;
      case 'addresses':
        return <AccountAddresses />;
      case 'orders':
        return <AccountOrders />;
      case 'wishlist':
        return <AccountWishlist />;

      default:
        return <AccountDefault />;
    }
  }
}
