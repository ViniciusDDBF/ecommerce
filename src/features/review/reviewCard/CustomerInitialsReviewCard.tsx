import type { CustomerInitialsReviewCardProps, FC } from '../../../types';
import { Shield } from 'lucide-react';

export const CustomerInitialsReviewCard: FC<
  CustomerInitialsReviewCardProps
> = ({ firstName, lastName, createdAt }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="bg-charcoal-700 flex h-12 w-12 items-center justify-center rounded-full">
          <span className="text-ember-400 text-lg font-bold">
            {`${firstName?.[0]}${lastName?.[0]}`}
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <h1 className={`text-charcoal-100 text-base font-medium`}>
            {firstName}
          </h1>
          <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
            <Shield className="mr-1 h-3 w-3" />
            Verified
          </span>
        </div>
        <p className="text-charcoal-300 text-xs">
          {new Date(createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};
