import { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { ThunkLogOut } from '../../store/slices/userSlice';
import Button from '../Button';
import { useNavigate } from 'react-router';
import { useAppDispatch } from '../../store/hooks/hooks';
const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const menuItems = [
    {
      icon: <User className="h-4 w-4" />,
      label: 'Profile Settings',
      description: 'Manage your account',
      href: '/profile',
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: 'Addresses',
      description: 'Shipping & billing',
      href: '/addresses',
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
        onClick={() => {
          setIsOpen(!isOpen);
        }}
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
                <div className="from-ember-400 to-ember-600 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br font-bold">
                  {user.user?.first_name?.at(0)}
                </div>
                <div>
                  <h3 className="text-charcoal-100 font-semibold">
                    {user.user?.first_name}
                  </h3>
                  <p className="text-charcoal-400 text-sm">
                    {user.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
              {menuItems.map((item, index) => (
                <Button
                  className="flex justify-start"
                  variant="ghost"
                  size="full"
                  endIcon={
                    item.badge && (
                      <span className="bg-ember-500 rounded-full px-1.5 py-0.5 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )
                  }
                  text={item.label}
                  key={index}
                  startIcon={item.icon}
                  onClick={() => {
                    navigate(`/account${item.href}`);
                    setIsOpen(false);
                  }}
                />
              ))}
            </div>

            {/* Footer */}
            <div className="border-charcoal-600/30 border-t py-2">
              <div className="group">
                <Button
                  startIcon={
                    <LogOut className="text-charcoal-400 h-4 w-4 group-hover:text-red-400" />
                  }
                  variant="ghost"
                  size="full"
                  text="Sign Out"
                  className="flex justify-start transition group-hover:border-red-400 hover:text-red-400"
                  onClick={() => dispatch(ThunkLogOut())}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Demo Background */}
    </div>
  );
};

export default AccountDropdown;
