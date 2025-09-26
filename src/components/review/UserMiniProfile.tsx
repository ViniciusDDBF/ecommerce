import { Shield } from 'lucide-react';
import type { Review } from '../ReviewSection';

interface UserMiniProfileProps {
  review: Review;
}

export const UserMiniProfile = ({ review }: UserMiniProfileProps) => {
  const avatar = review.is_anonymous
    ? 'AN'
    : `${review.customer.first_name?.[0] || ''}${review.customer.last_name?.[0] || ''}`;
  const displayName = review.is_anonymous
    ? 'Anonymous'
    : review.customer.first_name;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-charcoal-700 flex h-16 w-16 items-center justify-center rounded-full">
        <span className="text-ember-400 text-xl font-bold">{avatar}</span>
      </div>
      <div className="space-y-1">
        <div className="flex gap-4">
          <h3 className="text-charcoal-100 text-lg font-semibold">
            {displayName}
          </h3>
          <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
            <Shield className="mr-1 h-3 w-3" />
            Verified
          </span>
        </div>
        <p className="text-charcoal-300 text-sm">
          {new Date(review.created_at).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};
