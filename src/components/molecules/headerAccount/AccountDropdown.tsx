import type { FC } from '@/types';
import { useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { nanoid } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router';
import { Button, CustomerInitials } from '@/components/atoms';
import { AccountIcon, menuItems } from '@/components/molecules';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { ThunkLogOut } from '@/store/slices/userSlice';

export const AccountDropdown: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector('user');
  const navigate = useNavigate();

  return (
    <div className="relative inline-block">
      {/* ---------- Trigger Button ---------- */}
      <div className="sm:hidden">
        <AccountIcon onClick={() => setIsOpen(!isOpen)} />
      </div>
      <div className="hidden sm:block">
        <Button
          className="w-full sm:w-auto"
          endIcon={
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 sm:h-5 sm:w-5 ${isOpen ? 'rotate-180' : ''}`}
            />
          }
          loading={user.isLoading}
          onClick={() => setIsOpen(!isOpen)}
          selected={isOpen}
          size="sm"
          startIcon={<User className="h-4 w-4 sm:h-5 sm:w-5" />}
          text={<span className="text-sm sm:text-base">My Account</span>}
          variant="outline"
        />
      </div>

      {/* ---------- Dropdown Menu ---------- */}
      {isOpen && (
        <>
          {/* ---------- Backdrop ---------- */}
          <button
            aria-label="Close menu"
            className="fixed inset-0 z-10 cursor-default bg-transparent"
            onClick={() => setIsOpen(false)}
            type="button"
          />

          {/* ---------- Menu Panel ---------- */}
          <div
            className={`bg-charcoal-800/95 border-charcoal-600/50 animate-in slide-in-from-top-2 absolute right-0 z-20 mt-1 w-64 rounded-xl border shadow-2xl backdrop-blur-xl duration-200 sm:mt-2 sm:w-72 md:w-80`}
          >
            {/* ---------- Header ---------- */}
            <div className="border-charcoal-600/30 border-b p-3 sm:p-4">
              {user.user?.first_name &&
                user.user?.email &&
                user.user?.last_name && (
                  <CustomerInitials
                    email={user.user?.email}
                    firstName={user.user.first_name}
                    lastName={user.user.last_name}
                  />
                )}
            </div>

            {/* ---------- Menu Items ---------- */}
            <div className="py-1 sm:py-2">
              {menuItems.map((item) => (
                <Button
                  key={nanoid()}
                  className="flex justify-start text-sm sm:text-base"
                  endIcon={
                    item.badge && (
                      <span className="bg-ember-500 text-charcoal-50 rounded-full px-1 py-0.5 text-xs font-medium sm:px-1.5">
                        {item.badge}
                      </span>
                    )
                  }
                  onClick={() => {
                    navigate(`/account${item.href}`);
                    setIsOpen(false);
                  }}
                  size="full"
                  startIcon={item.icon}
                  text={item.label}
                  variant="ghost"
                />
              ))}
            </div>

            {/* ---------- Footer ---------- */}
            <div className="border-charcoal-600/30 border-t py-1 sm:py-2">
              <div className="group">
                <Button
                  className="flex justify-start text-sm transition group-hover:border-red-400 hover:text-red-400 sm:text-base"
                  onClick={() => {
                    dispatch(ThunkLogOut());
                    setIsOpen(false);
                  }}
                  size="full"
                  startIcon={
                    <LogOut className="text-charcoal-400 h-3 w-3 group-hover:text-red-400 sm:h-4 sm:w-4" />
                  }
                  text="Sign Out"
                  variant="ghost"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
