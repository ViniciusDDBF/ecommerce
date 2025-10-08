import type { FC } from '@/types';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button, Drawer, Overlay } from '@/components/atoms';
import { CartIcon } from '@/features';
import { useClickOutside, useScrollLock } from '@/hooks/';

export const Cart: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useClickOutside({ ref: cartRef, callback: () => setIsOpen(false) });
  useScrollLock({ isActive: isOpen });

  return (
    <>
      <CartIcon onClick={() => setIsOpen(true)} />

      {isOpen && (
        <>
          <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
          <Drawer
            ref={cartRef}
            isOpen={isOpen}
            position="right"
            className="w-11/12 sm:w-96 md:w-[28rem]"
          >
            <div className="bg-charcoal-900 flex h-full flex-col p-4 sm:p-6">
              {/* ---------- Drawer Header ---------- */}
              <div className="mb-4 flex items-center justify-between sm:mb-6">
                <h2 className="text-ember-400 text-lg font-semibold sm:text-xl md:text-2xl">
                  Your Cart
                </h2>
                <Button
                  variant="ghost"
                  size="xs"
                  startIcon={
                    <X className="text-charcoal-200 h-4 w-4 sm:h-5 sm:w-5" />
                  }
                  onClick={() => setIsOpen(false)}
                  aria-label="Close cart"
                  className="p-2"
                />
              </div>

              {/* ---------- Cart Content (Placeholder) ---------- */}
              <div className="flex-1 overflow-y-auto">
                <p className="text-charcoal-300 text-sm sm:text-base">
                  Your cart is empty.
                </p>
                <div className="space-y-6 sm:space-y-8">
                  <div className="group relative">
                    <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8">
                      <div className="space-y-4 sm:space-y-6">
                        {/* ---------- WIP ---------- */}
                        <h2 className="text-ember-400 mb-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-2xl">
                          WIP
                        </h2>
                        <p className="text-charcoal-50">
                          I'm developing this feature!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* ---------- Add cart items here in a real implementation ---------- */}
              </div>

              {/* ---------- Drawer Footer ---------- */}
              <div className="border-charcoal-600/30 border-t pt-3 sm:pt-4">
                <Button
                  text="Proceed to Checkout"
                  variant="primary"
                  size="full"
                  onClick={() => {
                    navigate('/checkout');
                    setIsOpen(false);
                  }}
                  disabled
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </Drawer>
        </>
      )}
    </>
  );
};
