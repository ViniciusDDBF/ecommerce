import type { FC, StarRatingProps } from '@/types';
import { Star } from 'lucide-react';
import { nanoid } from '@reduxjs/toolkit';

export const StarRating: FC<StarRatingProps> = ({ rating, setRating }) => {
  return (
    <div>
      <h2 className="text-charcoal-50 flex justify-center text-xl font-bold">
        Select the rating
        <span className="text-ember-500 ml-1">*</span>
      </h2>
      <div className="mb-6 flex justify-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <button
            className="cursor-pointer transition-transform hover:scale-110 focus:outline-none"
            key={nanoid()}
            onClick={() => setRating(i + 1)}
            type="button"
          >
            <Star
              className={`h-8 w-8 ${rating >= i + 1 ? 'text-ember-500' : 'text-charcoal-400'}`}
              fill={rating >= i + 1 ? 'currentColor' : 'none'}
              stroke={rating >= i + 1 ? 'none' : 'currentColor'}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
