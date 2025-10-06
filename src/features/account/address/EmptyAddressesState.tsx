import { Plus } from 'lucide-react';
import type { EmptyAddressesStateProps } from '../../../types';

export const EmptyAddressesState = ({
  onAddClick,
}: EmptyAddressesStateProps) => {
  return (
    <div className="py-6 text-center sm:py-8">
      <div onClick={onAddClick} className="group cursor-pointer">
        <div className="border-charcoal-600 hover:border-ember-400/50 bg-charcoal-800/30 hover:bg-charcoal-800/50 rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-300 sm:p-12 md:p-16">
          <h3 className="text-charcoal-300 group-hover:text-charcoal-200 mb-6 text-xl font-light transition sm:mb-8 sm:text-2xl md:text-3xl">
            No addresses saved yet!
          </h3>
          <div className="bg-charcoal-700 group-hover:bg-ember-500/20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full transition-all duration-300 sm:mb-6 sm:h-20 sm:w-20">
            <Plus className="text-charcoal-400 group-hover:text-ember-400 h-8 w-8 transition-all duration-300 sm:h-10 sm:w-10" />
          </div>
          <h3 className="text-charcoal-300 group-hover:text-charcoal-200 text-base font-medium transition-all duration-300 sm:text-lg md:text-xl">
            Add New Address
          </h3>
        </div>
      </div>
    </div>
  );
};
