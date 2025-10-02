import { Star, StarHalf } from 'lucide-react';
import { Link } from '../../components/atoms';

interface ProductReviewsProps {
  averageRating: number;
  reviewCount: number;
  onClick?: () => void;
}

export const ProductReviewsHeader = ({
  averageRating,
  reviewCount,
  onClick,
}: ProductReviewsProps) => {
  const renderStars = () => {
    const stars = [];
    const roundedRating = Math.round(averageRating * 2) / 2; // Round to nearest 0.5
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(roundedRating)) {
        stars.push(
          <Star
            key={i}
            className="text-ember-400 fill-ember-400 ember-transition h-3 w-3 sm:h-5 sm:w-5"
          />,
        );
      } else if (i === Math.floor(roundedRating) && roundedRating % 1 !== 0) {
        stars.push(
          <div key={i} className="relative inline-block">
            <Star className="text-charcoal-200 fill-charcoal-200 ember-transition absolute top-0 left-0 z-0 h-3 w-3 sm:h-5 sm:w-5" />
            <StarHalf className="text-ember-400 fill-ember-400 ember-transition relative z-10 h-3 w-3 sm:h-5 sm:w-5" />
          </div>,
        );
      } else {
        stars.push(
          <Star
            key={i}
            className="text-charcoal-200 fill-charcoal-200 ember-transition h-3 w-3 sm:h-5 sm:w-5"
          />,
        );
      }
    }
    return stars;
  };

  return (
    <div
      onClick={onClick}
      className="group flex size-fit cursor-pointer items-center space-x-2"
    >
      <div className="flex items-center">{renderStars()}</div>
      <span className="text-charcoal-300 flex items-center text-sm sm:text-base">
        {averageRating.toFixed(1)}
        <Link
          text={`${reviewCount} reviews`}
          className="group-hover:text-ember-300"
          selected={true}
        />
      </span>
    </div>
  );
};
