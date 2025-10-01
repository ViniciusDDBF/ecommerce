import { useState } from 'react';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { ThunkLogOut } from '../../store/slices/userSlice';
import Button from '../../components/atoms/Button';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import AccountIcon from './AccountIcon';

const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector('user');
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <User className="h-3 w-3 sm:h-4 sm:w-4" />,
      label: 'Profile Settings',
      description: 'Manage your account',
      href: '/profile',
    },
    {
      icon: <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />,
      label: 'Addresses',
      description: 'Shipping & billing',
      href: '/addresses',
    },
    {
      icon: <ShoppingBag className="h-3 w-3 sm:h-4 sm:w-4" />,
      label: 'My Orders',
      description: 'Track your purchases',
      href: '/orders',
      badge: '3',
    },
    {
      icon: <Heart className="h-3 w-3 sm:h-4 sm:w-4" />,
      label: 'Wishlist',
      description: 'Saved items',
      href: '/wishlist',
      badge: '12',
    },
  ];

  return (
    <div className="relative inline-block">
      {/* ---------- Trigger Button ---------- */}
      <div className="sm:hidden">
        <AccountIcon onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="hidden sm:block">
        <Button
          loading={user.isLoading}
          size="sm"
          variant="outline"
          selected={isOpen}
          text={<span className="text-sm sm:text-base">My Account</span>}
          onClick={() => setIsOpen(!isOpen)}
          startIcon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
          endIcon={
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 ${isOpen ? 'rotate-180' : ''}`}
            />
          }
          className="w-full sm:w-auto"
        />
      </div>

      {/* ---------- Dropdown Menu ---------- */}
      {isOpen && (
        <>
          {/* ---------- Backdrop ---------- */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* ---------- Menu Panel ---------- */}
          <div
            className={`bg-charcoal-800/95 border-charcoal-600/50 animate-in slide-in-from-top-2 absolute right-0 z-20 mt-1 w-64 rounded-xl border shadow-2xl backdrop-blur-xl duration-200 sm:mt-2 sm:w-72 md:w-80`}
          >
            {/* ---------- Header ---------- */}
            <div className="border-charcoal-600/30 border-b p-3 sm:p-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="from-ember-400 to-ember-600 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold sm:h-10 sm:w-10 sm:text-base">
                  {user.user?.first_name?.at(0)}
                </div>
                <div>
                  <h3 className="text-charcoal-100 text-sm font-semibold sm:text-base">
                    {user.user?.first_name}
                  </h3>
                  <p className="text-charcoal-400 text-xs sm:text-sm">
                    {user.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* ---------- Menu Items ---------- */}
            <div className="py-1 sm:py-2">
              {menuItems.map((item, index) => (
                <Button
                  className="flex justify-start text-sm sm:text-base"
                  variant="ghost"
                  size="full"
                  endIcon={
                    item.badge && (
                      <span className="bg-ember-500 rounded-full px-1 py-0.5 text-xs font-medium text-white sm:px-1.5">
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

            {/* ---------- Footer ---------- */}
            <div className="border-charcoal-600/30 border-t py-1 sm:py-2">
              <div className="group">
                <Button
                  startIcon={
                    <LogOut className="text-charcoal-400 h-3 w-3 group-hover:text-red-400 sm:h-4 sm:w-4" />
                  }
                  variant="ghost"
                  size="full"
                  text="Sign Out"
                  className="flex justify-start text-sm transition group-hover:border-red-400 hover:text-red-400 sm:text-base"
                  onClick={() => {
                    dispatch(ThunkLogOut());
                    setIsOpen(false);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountDropdown;
