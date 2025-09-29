import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingFilterProps {
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  average: number;
  onRatingSelect?: (rating: number | null) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  rate1,
  rate2,
  rate3,
  rate4,
  rate5,
  average,
  onRatingSelect,
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const ratings = [
    { stars: 5, count: rate5 },
    { stars: 4, count: rate4 },
    { stars: 3, count: rate3 },
    { stars: 2, count: rate2 },
    { stars: 1, count: rate1 },
  ];

  const totalReviews = rate1 + rate2 + rate3 + rate4 + rate5;

  const getPercentage = (count: number): number => {
    if (totalReviews === 0) return 0;
    return Math.round((count / totalReviews) * 100);
  };

  const handleRatingClick = (stars: number) => {
    const newSelection = selectedRating === stars ? null : stars;
    setSelectedRating(newSelection);
    onRatingSelect?.(newSelection);
  };

  // Calculate circle progress (average out of 5 = percentage)
  const circleProgress = (average / 5) * 100;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const strokeDashoffset =
    circumference - (circleProgress / 100) * circumference;

  return (
    <div className="bg-charcoal-800 w-full max-w-md space-y-6 rounded-lg p-6">
      {/* Average Rating Circle */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="relative h-32 w-32">
          {/* Background circle */}
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-charcoal-600"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-ember-500 transition-all duration-500"
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
          {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
        </div>
      </div>

      {/* Rating Bars */}
      <div className="s space-y-3">
        {ratings.map(({ stars, count }) => {
          const percentage = getPercentage(count);
          const isSelected = selectedRating === stars;

          return (
            <button
              key={stars}
              onClick={() => handleRatingClick(stars)}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 transition-all duration-200 ${
                isSelected ? 'ring-ember-500 ring-1' : 'hover:bg-charcoal-600'
              }`}
            >
              {/* Star rating number */}
              <div className="flex min-w-[3rem] items-center gap-1">
                <span className="text-charcoal-200 font-medium">{stars}</span>
                <Star
                  className={`h-4 w-4 ${
                    isSelected
                      ? 'text-ember-400 fill-ember-400'
                      : 'text-charcoal-400 fill-charcoal-400'
                  }`}
                />
              </div>

              {/* Progress bar */}
              <div className="bg-charcoal-900 h-2 flex-1 overflow-hidden rounded-full">
                <div
                  className={`h-full transition-all duration-500 ${
                    isSelected ? 'bg-ember-500' : 'bg-ember-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Percentage */}
              <div
                className={`min-w-[3rem] text-right text-sm font-medium ${
                  isSelected ? 'text-ember-400' : 'text-charcoal-300'
                }`}
              >
                {percentage}%
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
