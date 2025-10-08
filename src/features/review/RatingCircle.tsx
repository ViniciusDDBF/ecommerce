import type { FC, RatingCircleProps } from '@/types';
import { Star } from 'lucide-react';

export const RatingCircle: FC<RatingCircleProps> = ({
  average,
  review_count,
  className,
}) => {
  const circleProgress = (average / 5) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset =
    circumference - (circleProgress / 100) * circumference;

  return (
    <div
      className={`flex flex-col items-center justify-center py-4 ${className}`}
    >
      <div className="relative h-32 w-32">
        {/* Background circle */}
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            className="text-charcoal-600"
            cx="64"
            cy="64"
            fill="none"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            className="text-ember-500 transition-all duration-500"
            cx="64"
            cy="64"
            fill="none"
            r="45"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="8"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-charcoal-50 text-3xl font-bold">
            {average.toFixed(1)}
          </div>
          <div className="text-ember-400 flex items-center gap-1">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-charcoal-300 text-sm">/ 5.0</span>
          </div>
        </div>
      </div>
      <div className="text-charcoal-400 mt-2 text-sm">
        Based on {review_count} {review_count === 1 ? 'review' : 'reviews'}
      </div>
    </div>
  );
};
