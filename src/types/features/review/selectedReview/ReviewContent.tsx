import type { Review } from '../Reviews';

interface ReviewContentProps {
  review: Review;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({ review }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-charcoal-50 text-lg leading-tight font-bold break-words md:text-xl">
        {review.title}
      </h3>
      <p className="text-charcoal-200 text-sm leading-relaxed break-words">
        {review.content}
      </p>
    </div>
  );
};
