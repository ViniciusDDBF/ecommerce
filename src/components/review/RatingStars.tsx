import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export const RatingStars = ({ rating, className = '' }: RatingStarsProps) => (
  <div
    className={`flex items-center gap-1 ${className}`}
    role="img"
    aria-label={`Rating: ${rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`h-5 w-5 ${star <= rating ? 'fill-ember-400 text-ember-400' : 'text-charcoal-400'}`}
        aria-hidden="true"
      />
    ))}
    <span className="text-charcoal-300 ml-1 text-sm font-medium">
      {rating.toFixed(1)}
    </span>
  </div>
);
