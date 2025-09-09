import { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store/store';
import { ThunkLogOut } from '../../store/slices/userSlice';
import Button from '../Button';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const menuItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: 'Profile Settings',
      description: 'Manage your account',
      href: '/profile',
    },
    {
      icon: <ShoppingBag className="h-4 w-4" />,
      label: 'My Orders',
      description: 'Track your purchases',
      href: '/orders',
      badge: '3',
    },
    {
      icon: <Heart className="h-4 w-4" />,
      label: 'Wishlist',
      description: 'Saved items',
      href: '/wishlist',
      badge: '12',
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: 'Addresses',
      description: 'Shipping & billing',
      href: '/addresses',
    },
    {
      icon: <CreditCard className="h-4 w-4" />,
      label: 'Payment Methods',
      description: 'Cards & wallets',
      href: '/payments',
    },
    {
      icon: <Bell className="h-4 w-4" />,
      label: 'Notifications',
      description: 'Alerts & updates',
      href: '/notifications',
    },
    {
      icon: <HelpCircle className="h-4 w-4" />,
      label: 'Help & Support',
      description: 'Get assistance',
      href: '/support',
    },
  ];

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <Button
        loading={user.isLoading}
        size="full"
        variant="outline"
        selected={isOpen}
        text="My account"
        onClick={() => setIsOpen(!isOpen)}
        startIcon={<User />}
        endIcon={
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        }
      />

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu Panel */}
          <div
            className={`bg-charcoal-800/95 border-charcoal-600/50 animate-in slide-in-from-top-2 absolute right-0 z-20 mt-2 w-80 rounded-xl border shadow-2xl backdrop-blur-xl duration-200`}
          >
            {/* Header */}
            <div className="border-charcoal-600/30 border-b p-4">
              <div className="flex items-center gap-3">
                <div className="from-ember-400 to-ember-600 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br">
                  {user.user?.first_name?.at(0)}
                </div>
                <div>
                  <h3 className="text-charcoal-100 font-semibold">John Doe</h3>
                  <p className="text-charcoal-400 text-sm">
                    john.doe@email.com
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className={`hover:bg-charcoal-700/50 hover:border-ember-400/20 group relative flex w-full items-center gap-3 overflow-hidden rounded-lg p-3 text-left transition-all duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Icon */}
                  <div className="text-charcoal-300 group-hover:text-ember-400 transition-colors duration-200">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-charcoal-200 group-hover:text-charcoal-100 font-medium transition-colors duration-200">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="bg-ember-500 rounded-full px-1.5 py-0.5 text-xs font-medium text-white">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal-400 group-hover:text-charcoal-300 text-sm transition-colors duration-200">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="from-ember-500/5 absolute inset-0 bg-gradient-to-r to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="border-charcoal-600/30 border-t p-2">
              <button
                onClick={() => dispatch(ThunkLogOut())}
                className={`group flex w-full items-center gap-3 rounded-lg p-3 text-left transition-all duration-200 hover:border-red-400/20 hover:bg-red-500/10`}
              >
                <LogOut className="text-charcoal-400 h-4 w-4 transition-colors duration-200 group-hover:text-red-400" />
                <span className="text-charcoal-300 font-medium transition-colors duration-200 group-hover:text-red-400">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Demo Background */}
      <div className="bg-charcoal-900 fixed inset-0 -z-10">
        <div className="from-charcoal-800 via-charcoal-900 to-charcoal-900 absolute inset-0 bg-gradient-to-br" />
      </div>
    </div>
  );
};

export default AccountDropdown;
