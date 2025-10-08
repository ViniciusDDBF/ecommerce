import type { FC, ReviewHeaderProps } from '@/types';
import { Shield, Star, X } from 'lucide-react';
import { Button } from '@/components/atoms';

export const ReviewHeader: FC<ReviewHeaderProps> = ({
  review,
  onClose,
  isMobile = false,
}) => {
  return (
    <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-charcoal-50 font-medium">
                {review.customer.first_name}
              </span>
              <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                <Shield className="mr-1 h-2.5 w-2.5" />
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
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-4 w-4 md:h-5 md:w-5 ${
                  star <= review.rating
                    ? 'fill-ember-400 text-ember-400'
                    : 'text-charcoal-400'
                }`}
              />
            ))}
          </div>
          <span className="text-charcoal-300 text-sm font-medium">
            {review.rating.toFixed(1)}
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        size="xs"
        startIcon={<X className="h-4 w-4 md:h-5 md:w-5" />}
        onClick={onClose}
        aria-label="Close modal"
        className={`${isMobile ? 'md:hidden' : 'hidden md:inline-flex'}`}
      />
    </div>
  );
};
