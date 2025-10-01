import {
  Shield,
  Star,
  CirclePlay,
  ZoomIn,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import Button from '../../components/atoms/Button';
import { type Review } from './ReviewSection';
import ReviewSortBy from './ReviewSortBy';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { useRef } from 'react'; // Removed useEffect

export interface ReviewState {
  positiveVotes: number;
  negativeVotes: number;
  hasLiked: boolean;
  hasDisliked: boolean;
  isExpanded: boolean;
}

interface ReviewCardProps {
  currentPage: number;
  totalPages: number;
  reviews: Review[];
  getReviewState: (id: number) => ReviewState;
  updateReviewState: (id: number, updates: Partial<ReviewState>) => void;
  openReviewModal: (review: Review, index: number) => void;
  handleLikeClick: (id: number) => void;
  handleDislikeClick: (id: number) => void;
  onPageChange: (page: number) => void;
  onSortBy: (sort: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  currentPage,
  totalPages,
  reviews,
  getReviewState,
  updateReviewState,
  openReviewModal,
  handleLikeClick,
  handleDislikeClick,
  onPageChange,
  onSortBy,
}) => {
  const { scrollTo } = useSmoothScroll();
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={sectionRef} className="bg-charcoal-900 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <ReviewSortBy onSortBy={onSortBy} />
        {reviews.map((review) => {
          const avatar = review.is_anonymous
            ? 'AN'
            : `${review.customer.first_name?.[0] || ''}${
                review.customer.last_name?.[0] || ''
              }`;
          const displayName = review.is_anonymous
            ? 'Anonymous'
            : review.customer.first_name;
          const {
            positiveVotes,
            negativeVotes,
            hasLiked,
            hasDisliked,
            isExpanded,
          } = getReviewState(review.id);

          return (
            <div
              key={review.id}
              className="glass-effect rounded-lg border border-transparent p-4 transition-colors sm:p-6"
            >
              {/* ---------- Top Section: User Profile ---------- */}
              <div className="border-charcoal-600 mb-4 flex flex-col justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="bg-charcoal-700 flex h-12 w-12 items-center justify-center rounded-full">
                      <span className="text-ember-400 text-lg font-bold">
                        {avatar}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <h3 className="text-charcoal-100 text-base font-semibold">
                        {displayName}
                      </h3>
                      <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                        <Shield className="mr-1 h-3 w-3" />
                        Verified
                      </span>
                    </div>
                    <p className="text-charcoal-300 text-xs">
                      {new Date(review.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 text-left sm:text-right">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'fill-ember-400 text-ember-400'
                            : 'text-charcoal-400'
                        }`}
                      />
                    ))}
                    <span className="text-charcoal-300 ml-1 text-xs font-medium">
                      {review.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* ---------- Main Content Section ---------- */}
              <div className="space-y-4">
                {/* ---------- Content ---------- */}
                <div>
                  <h3 className="text-charcoal-100 mb-2 text-lg leading-tight font-bold break-words">
                    {review.title}
                  </h3>
                  <p
                    className={`text-charcoal-300 text-sm leading-relaxed break-words ${
                      !isExpanded ? 'line-clamp-3' : ''
                    }`}
                  >
                    {review.content}
                  </p>
                  {review.content.length > 420 && (
                    <button
                      className="text-ember-400 hover:text-ember-500 mt-2 cursor-pointer text-sm font-medium"
                      onClick={() =>
                        updateReviewState(review.id, {
                          isExpanded: !isExpanded,
                        })
                      }
                    >
                      {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                  )}
                </div>

                {/* ---------- Media thumbnail ---------- */}
                {review.media.length > 0 && (
                  <div className="flex justify-center">
                    <div className="grid w-full max-w-xs grid-cols-2 gap-2 sm:max-w-sm sm:grid-cols-3">
                      {review.media.map((media, index) => (
                        <div
                          key={media.id}
                          className="group relative cursor-pointer touch-manipulation"
                          onClick={() => openReviewModal(review, index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) =>
                            e.key === 'Enter' && openReviewModal(review, index)
                          }
                        >
                          <div className="bg-charcoal-700 aspect-square overflow-hidden rounded-md">
                            {media.media_type === 'video' ? (
                              <div className="relative size-full">
                                <video
                                  src={media.url}
                                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                  muted
                                  controls={false}
                                  preload="metadata"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <CirclePlay
                                    fill="black"
                                    fillOpacity={0.3}
                                    className="text-ember-400 h-8 w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                  />
                                </div>
                              </div>
                            ) : (
                              <div className="relative size-full">
                                <img
                                  src={media.url}
                                  alt={`Review media ${index + 1}`}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ZoomIn
                                    fill="black"
                                    fillOpacity={0.3}
                                    className="text-ember-400 h-8 w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ---------- Vote Buttons ---------- */}
                <div className="border-charcoal-700/50 flex items-center justify-center gap-3 border-t pt-3">
                  <Button
                    startIcon={<ThumbsUp className="h-3.5 w-3.5" />}
                    text={`Helpful (${positiveVotes})`}
                    variant={hasLiked ? 'secondary' : 'outline'}
                    disabled={hasLiked || hasDisliked}
                    onClick={() => handleLikeClick(review.id)}
                    className="px-3 py-1.5 text-xs"
                  />
                  <Button
                    startIcon={<ThumbsDown className="h-3.5 w-3.5" />}
                    text={`Not Helpful (${negativeVotes})`}
                    variant={hasDisliked ? 'secondary' : 'outline'}
                    disabled={hasLiked || hasDisliked}
                    onClick={() => handleDislikeClick(review.id)}
                    className="px-3 py-1.5 text-xs"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* ---------- Pagination Controls ---------- */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 pt-6">
            <Button
              text="Previous"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => {
                onPageChange(currentPage - 1);
                setTimeout(() => {
                  if (sectionRef.current) {
                    scrollTo(sectionRef.current, { offset: 0 });
                  }
                }, 0);
              }}
              className="px-3 py-1.5 text-sm"
            />
            <span className="text-charcoal-300 text-sm font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              text="Next"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => {
                onPageChange(currentPage + 1);
                setTimeout(() => {
                  if (sectionRef.current) {
                    scrollTo(sectionRef.current, { offset: 0 });
                  }
                }, 0);
              }}
              className="px-3 py-1.5 text-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
