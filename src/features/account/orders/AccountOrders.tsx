import type { FC } from '@/types';
import { AccountSectionHeader } from '@/features';

export const AccountOrders: FC = () => {
  return (
    <div className="bg-charcoal-900 min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        <AccountSectionHeader title="My Orders" subtitle="Manage your orders" />

        <div className="space-y-6 sm:space-y-8">
          <div className="group relative">
            <div className="glass-effect rounded-2xl p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                {/* ---------- WIP ---------- */}
                <h2 className="text-ember-400 mb-1 text-lg font-bold sm:mb-2 sm:text-xl md:text-2xl">
                  WIP
                </h2>
                <p className="text-charcoal-50">I'm developing this feature!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
