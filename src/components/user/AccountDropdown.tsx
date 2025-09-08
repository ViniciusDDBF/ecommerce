import React, { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: <User className="w-4 h-4" />,
      label: 'Profile Settings',
      description: 'Manage your account',
      href: '/profile',
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      label: 'My Orders',
      description: 'Track your purchases',
      href: '/orders',
      badge: '3',
    },
    {
      icon: <Heart className="w-4 h-4" />,
      label: 'Wishlist',
      description: 'Saved items',
      href: '/wishlist',
      badge: '12',
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Addresses',
      description: 'Shipping & billing',
      href: '/addresses',
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      label: 'Payment Methods',
      description: 'Cards & wallets',
      href: '/payments',
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: 'Notifications',
      description: 'Alerts & updates',
      href: '/notifications',
    },
    {
      icon: <HelpCircle className="w-4 h-4" />,
      label: 'Help & Support',
      description: 'Get assistance',
      href: '/support',
    },
  ];

  return (
    <div className="relative inline-block">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2.5 rounded-lg
          bg-charcoal-700 hover:bg-charcoal-600
          border border-charcoal-600 hover:border-ember-400/30
          text-charcoal-200 hover:text-charcoal-100
          transition-all duration-300 ease-out
          ${
            isOpen
              ? 'bg-charcoal-600 border-ember-400/50 text-charcoal-100'
              : ''
          }
        `}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ember-400 to-ember-600 flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium">My Account</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

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
            className={`
            absolute right-0 mt-2 w-80 z-20
            bg-charcoal-800/95 backdrop-blur-xl
            border border-charcoal-600/50
            rounded-xl shadow-2xl
            animate-in slide-in-from-top-2 duration-200
          `}
          >
            {/* Header */}
            <div className="p-4 border-b border-charcoal-600/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ember-400 to-ember-600 flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
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
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg
                    text-left transition-all duration-200
                    hover:bg-charcoal-700/50 hover:border-ember-400/20
                    group relative overflow-hidden
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  {/* Icon */}
                  <div className="text-charcoal-300 group-hover:text-ember-400 transition-colors duration-200">
                    {item.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-charcoal-200 font-medium group-hover:text-charcoal-100 transition-colors duration-200">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-xs font-medium bg-ember-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-charcoal-400 text-sm group-hover:text-charcoal-300 transition-colors duration-200">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-ember-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-2 border-t border-charcoal-600/30">
              <button
                className={`
                w-full flex items-center gap-3 p-3 rounded-lg
                text-left transition-all duration-200
                hover:bg-red-500/10 hover:border-red-400/20
                group
              `}
              >
                <LogOut className="w-4 h-4 text-charcoal-400 group-hover:text-red-400 transition-colors duration-200" />
                <span className="text-charcoal-300 font-medium group-hover:text-red-400 transition-colors duration-200">
                  Sign Out
                </span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Demo Background */}
      <div className="fixed inset-0 -z-10 bg-charcoal-900">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal-800 via-charcoal-900 to-charcoal-900" />
      </div>
    </div>
  );
};

export default AccountDropdown;
