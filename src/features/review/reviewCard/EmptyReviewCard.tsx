import type { EmptyReviewCardProps, FC } from '../../../types';
import { MessageSquare, Star } from 'lucide-react';
import { Button } from '../../../components/atoms';

export const EmptyReviewCard: FC<EmptyReviewCardProps> = ({ onClick }) => {
  return (
    <div className="mx-auto w-full max-w-2xl p-4">
      {/* Empty State Container */}
      <div className="bg-charcoal-800 border-charcoal-700 rounded-xl border p-12">
        {/* Icon Container */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="bg-charcoal-700 flex h-20 w-20 items-center justify-center rounded-full">
              <MessageSquare className="text-charcoal-500 h-10 w-10" />
            </div>
            {/* Decorative stars */}
            <Star className="text-ember-400/30 absolute -top-1 -right-1 h-5 w-5" />
            <Star className="text-ember-400/20 absolute -bottom-2 -left-2 h-4 w-4" />
          </div>
        </div>

        {/* Text Content */}
        <div className="mb-8 text-center">
          <h3 className="text-charcoal-50 mb-2 text-xl font-semibold">
            No Reviews Yet
          </h3>
          <p className="text-charcoal-400 mx-auto max-w-md text-base">
            Be the first to share your experience and help others make informed
            decisions.
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button onClick={onClick} text="Write a review" />
        </div>
      </div>
    </div>
  );
};
