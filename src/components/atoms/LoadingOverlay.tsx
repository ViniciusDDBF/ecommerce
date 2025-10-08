import type { FC } from '@/types';

export const LoadingOverlay: FC = () => {
  return (
    <div className="glass-effect bg-charcoal-900 fixed inset-0 z-50 flex items-center justify-center opacity-70">
      <div className="border-ember-500 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
    </div>
  );
};
