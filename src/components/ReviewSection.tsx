// #region /* ---------- Imports ---------- */
import { useState, useEffect } from 'react';
import {
  Star,
  Shield,
  X,
  ZoomIn,
  ThumbsUp,
  ThumbsDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
} from 'lucide-react';
import { supabase } from '../SupabaseConfig';
import Button from './Button';
import Overlay from './Overlay';
import useScrollLock from '../hooks/useScrollLock';
// #endregion

// #region /* ---------- Types ---------- */
export interface Customer {
  id: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string | null;
  phone?: string | null;
  cpf?: string | null;
  company_name?: string | null;
  legal_name?: string | null;
  cnpj?: string | null;
  is_cpf?: boolean | null;
}

interface Media {
  id: number;
  media_type: string;
  url: string;
  created_at: string;
}

export interface Review {
  id: number;
  created_at: string;
  rating: number;
  title: string;
  content: string;
  is_anonymous: boolean;
  positive_votes: number;
  negative_votes: number;
  customer: Customer;
  media: Media[];
}

interface EnhancedReviewCardProps {
  reviews: Review[];
  isLoggedIn: boolean;
}

// #endregion

const ReviewSection = ({ reviews }: EnhancedReviewCardProps) => {
  // #region /* ---------- Hooks/State ---------- */

  const [reviewStates, setReviewStates] = useState<{
    [key: number]: {
      positiveVotes: number;
      negativeVotes: number;
      hasLiked: boolean;
      hasDisliked: boolean;
      isExpanded: boolean;
    };
  }>({});

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [error, setError] = useState('');
  useScrollLock(selectedReview !== null);

  // #endregion

  // #region /* ---------- Function/Effects ---------- */

  const getReviewState = (reviewId: number) => {
    if (!reviewStates[reviewId]) {
      return {
        positiveVotes: 0,
        negativeVotes: 0,
        hasLiked: false,
        hasDisliked: false,
        isExpanded: false,
      };
    }
    return reviewStates[reviewId];
  };

  const updateReviewState = (
    reviewId: number,
    updates: Partial<{
      positiveVotes: number;
      negativeVotes: number;
      hasLiked: boolean;
      hasDisliked: boolean;
      isExpanded: boolean;
    }>,
  ) => {
    setReviewStates((prev) => ({
      ...prev,
      [reviewId]: {
        ...getReviewState(reviewId),
        ...updates,
      },
    }));
  };

  useEffect(() => {
    const initialStates: {
      [key: number]: {
        positiveVotes: number;
        negativeVotes: number;
        hasLiked: boolean;
        hasDisliked: boolean;
        isExpanded: boolean;
      };
    } = {};
    reviews.forEach((review) => {
      initialStates[review.id] = {
        positiveVotes: review.positive_votes || 0,
        negativeVotes: review.negative_votes || 0,
        hasLiked: false,
        hasDisliked: false,
        isExpanded: false,
      };
    });
    setReviewStates(initialStates);
  }, [reviews]);

  const handleLikeClick = async (reviewId: number) => {
    const currentState = getReviewState(reviewId);

    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .update({ positive_votes: currentState.positiveVotes + 1 })
        .eq('id', reviewId)
        .select('positive_votes')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      updateReviewState(reviewId, {
        positiveVotes: data.positive_votes,
        hasLiked: true,
        hasDisliked: false,
      });
      setError('');
    } catch (err) {
      setError('Failed to like review. Please try again.');
    }
  };

  const handleDislikeClick = async (reviewId: number) => {
    const currentState = getReviewState(reviewId);

    try {
      const { data, error } = await supabase
        .from('product_reviews')
        .update({ negative_votes: currentState.negativeVotes + 1 })
        .eq('id', reviewId)
        .select('negative_votes')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      updateReviewState(reviewId, {
        negativeVotes: data.negative_votes,
        hasLiked: false,
        hasDisliked: true,
      });
      setError('');
    } catch (err) {
      setError('Failed to dislike review. Please try again.');
    }
  };

  const openReviewModal = (review: Review, mediaIndex: number = 0) => {
    setSelectedReview(review);
    setCurrentMediaIndex(mediaIndex);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setCurrentMediaIndex(0);
    setError('');
  };

  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedReview || selectedReview.media.length === 0) return;

    if (direction === 'prev') {
      setCurrentMediaIndex((prev) =>
        prev === 0 ? selectedReview.media.length - 1 : prev - 1,
      );
    } else {
      setCurrentMediaIndex((prev) =>
        prev === selectedReview.media.length - 1 ? 0 : prev + 1,
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedReview) return;

      switch (e.key) {
        case 'Escape':
          closeReviewModal();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateMedia('prev');
          break;
        case 'ArrowRight':
          e.preventDefault();
          navigateMedia('next');
          break;
      }
    };

    if (selectedReview) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedReview]);
  // #endregion

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-charcoal-900 p-4 md:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-charcoal-300 text-lg">No reviews available.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-charcoal-900 p-4 md:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          {reviews.map((review) => {
            const avatar = review.is_anonymous
              ? 'AN'
              : `${review.customer.first_name?.[0] || ''}${review.customer.last_name?.[0] || ''}`;
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
                className="glass-effect hover:ember-hover-border rounded-xl transition md:p-8"
              >
                {/* Top Section: User Profile */}
                <div className="border-charcoal-600 mb-6 flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="bg-charcoal-700 flex h-16 w-16 items-center justify-center rounded-full">
                        <span className="text-ember-400 text-xl font-bold">
                          {avatar}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex gap-4">
                        <h3 className="text-charcoal-100 text-lg font-semibold">
                          {displayName}
                        </h3>
                        <div className="flex justify-end gap-2">
                          <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium">
                            <Shield className="mr-1 h-3 w-3" />
                            Verified
                          </span>
                        </div>
                      </div>
                      <p className="text-charcoal-300 text-sm">
                        {new Date(review.created_at).toLocaleDateString(
                          'en-US',
                          {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          },
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <div
                      className="flex items-center gap-1"
                      role="img"
                      aria-label={`Rating: ${review.rating} out of 5 stars`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= review.rating
                              ? 'fill-ember-400 text-ember-400'
                              : 'text-charcoal-400'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="text-charcoal-300 ml-1 text-sm font-medium">
                        {review.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Main Content Section */}
                <div className="space-y-6">
                  {/* Content */}
                  <div>
                    <h3 className="text-charcoal-100 mb-4 text-2xl leading-tight font-bold">
                      {review.title}
                    </h3>
                    <p
                      className={`text-charcoal-300 mb-4 text-lg leading-relaxed ${
                        !isExpanded ? 'line-clamp-3' : ''
                      }`}
                    >
                      {review.content}
                    </p>
                    {review.content.length > 200 && (
                      <button
                        className="text-ember-400 hover:text-ember-500 text-sm"
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
                      <div className="grid max-w-sm grid-cols-3 gap-3">
                        {review.media.map((media, index) => (
                          <div
                            key={media.id}
                            className="group relative cursor-pointer"
                            onClick={() => openReviewModal(review, index)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) =>
                              e.key === 'Enter' &&
                              openReviewModal(review, index)
                            }
                            aria-label={`View ${media.media_type || 'image'}: Review media ${index + 1}`}
                          >
                            <div className="bg-charcoal-700 aspect-square overflow-hidden rounded-lg">
                              {media.media_type === 'video' ? (
                                <div className="relative size-full">
                                  <div className="absolute inset-0 flex"></div>
                                  <video
                                    src={media.url}
                                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                                    muted
                                    controls={false}
                                    preload="metadata"
                                  />
                                </div>
                              ) : (
                                <img
                                  src={media.url}
                                  alt={`Review media ${index + 1}`}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              )}
                              <div
                                className={`absolute inset-0 flex items-center justify-center`}
                              >
                                <div
                                  className={`flex opacity-0 transition-all duration-300 group-hover:opacity-100`}
                                >
                                  {media.media_type === 'video' ? (
                                    <CirclePlay
                                      fill="black"
                                      fillOpacity={0.1}
                                      className="text-ember-400 absolute top-0 right-0 h-10 w-10 rounded-full"
                                    />
                                  ) : (
                                    <ZoomIn
                                      fill="black"
                                      fillOpacity={0.2}
                                      className="text-ember-400 absolute top-0 right-0 h-10 w-10 rounded-full"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vote Buttons */}
                  <div className="border-charcoal-700/50 flex items-center justify-center gap-4 border-t pt-4">
                    <Button
                      startIcon={<ThumbsUp className="h-4 w-4" />}
                      text={`Helpful (${positiveVotes})`}
                      variant={hasLiked ? 'secondary' : 'outline'}
                      disabled={hasLiked || hasDisliked}
                      onClick={() => handleLikeClick(review.id)}
                    />

                    <Button
                      startIcon={<ThumbsDown className="h-4 w-4" />}
                      text={`Helpful (${negativeVotes})`}
                      variant={hasDisliked ? 'secondary' : 'outline'}
                      disabled={hasLiked || hasDisliked}
                      onClick={() => handleDislikeClick(review.id)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Facebook-style Overlay Modal */}
      {selectedReview && (
        <Overlay onClick={closeReviewModal} isOpen={selectedReview !== null}>
          {/* Left side - Media */}
          <div className="pointer-events-none fixed inset-0 z-30 flex items-center justify-center p-4 pr-96">
            {selectedReview.media.length > 0 && (
              <div className="pointer-events-auto relative max-h-full max-w-4xl">
                {selectedReview.media[currentMediaIndex].media_type ===
                'video' ? (
                  <video
                    src={selectedReview.media[currentMediaIndex].url}
                    controls
                    className="h-[90vh] w-[90vh] rounded-lg shadow-2xl"
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedReview.media[currentMediaIndex].url}
                    alt={`Review media ${currentMediaIndex + 1}`}
                    className="h-[90vh] w-[90vh] rounded-lg object-contain shadow-2xl"
                    onError={(e) =>
                      (e.currentTarget.src = '/fallback-image.jpg')
                    }
                  />
                )}

                {/* Media navigation buttons */}
                {selectedReview.media.length > 1 && (
                  <>
                    <button
                      className="absolute top-1/2 left-4 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70"
                      aria-label="Previous media"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => {
                        navigateMedia('next');
                      }}
                      className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70"
                      aria-label="Next media"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Right side - Review details */}
          <div className="bg-charcoal-800 border-charcoal-600 fixed top-0 right-0 z-30 flex h-full w-96 flex-col overflow-hidden border-l">
            {/* Header */}
            <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
              {/* User info */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="bg-charcoal-700 flex h-12 w-12 items-center justify-center rounded-full">
                    <span className="text-ember-400 text-lg font-bold">
                      {selectedReview.is_anonymous
                        ? 'AN'
                        : `${selectedReview.customer.first_name?.[0] || ''}${selectedReview.customer.last_name?.[0] || ''}`}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">
                        {selectedReview.is_anonymous
                          ? 'Anonymous'
                          : selectedReview.customer.first_name}
                      </span>
                      <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                        <Shield className="mr-1 h-2.5 w-2.5" />
                        Verified
                      </span>
                    </div>
                    <p className="text-charcoal-300 text-sm">
                      {new Date(selectedReview.created_at).toLocaleDateString(
                        'en-US',
                        {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        },
                      )}
                    </p>
                  </div>
                </div>
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= selectedReview.rating
                            ? 'fill-ember-400 text-ember-400'
                            : 'text-charcoal-400'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-charcoal-300 text-sm font-medium">
                    {selectedReview.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="xs"
                startIcon={
                  <X className="text-charcoal-200 h-4 w-4 sm:h-5 sm:w-5" />
                }
                onClick={() => {
                  closeReviewModal();
                }}
                aria-label="Close cart"
                className="p-2"
              />
            </div>

            {/* Review content - scrollable */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {/* Title */}
              <h3 className="text-xl break-words line-clamp-1 leading-tight font-bold text-white">
                {selectedReview.title}
              </h3>

              {/* Content */}
              <p className="text-charcoal-300 break-words leading-relaxed">
                {selectedReview.content}
              </p>

              {/* Media thumbnails */}
              {selectedReview.media.length > 1 && (
                <div>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedReview.media.map((media, index) => {
                      return (
                        <button
                          key={media.id}
                          onClick={() => setCurrentMediaIndex(index)}
                          className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                            index === currentMediaIndex
                              ? 'border-ember-400'
                              : 'hover:border-charcoal-500 border-transparent'
                          }`}
                        >
                          {media.media_type === 'image' && (
                            <img
                              src={media.url}
                              alt={`Media ${index + 1}`}
                              className="h-full w-full object-cover"
                              onError={(e) =>
                                (e.currentTarget.src = '/fallback-image.jpg')
                              }
                            />
                          )}
                          {media.media_type === 'video' && (
                            <div className="relative size-full">
                              <div className="absolute inset-0 flex items-center justify-center"></div>
                              <video
                                src={media.url}
                                className="h-full w-full transition-transform duration-300 group-hover:scale-110"
                                muted
                                controls={false}
                                preload="metadata"
                              />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer - Vote buttons */}
            <div className="border-charcoal-600 border-t p-4">
              <div className="flex justify-between gap-2 px-4">
                <Button
                  startIcon={<ThumbsDown className="h-4 w-4" />}
                  text={getReviewState(selectedReview.id).positiveVotes}
                  variant={
                    getReviewState(selectedReview.id).hasLiked
                      ? 'secondary'
                      : 'outline'
                  }
                  disabled={
                    getReviewState(selectedReview.id).hasLiked ||
                    getReviewState(selectedReview.id).hasDisliked
                  }
                  onClick={() => handleLikeClick(selectedReview.id)}
                />
                <Button
                  startIcon={<ThumbsDown className="h-4 w-4" />}
                  text={getReviewState(selectedReview.id).negativeVotes}
                  variant={
                    getReviewState(selectedReview.id).hasDisliked
                      ? 'secondary'
                      : 'outline'
                  }
                  disabled={
                    getReviewState(selectedReview.id).hasLiked ||
                    getReviewState(selectedReview.id).hasDisliked
                  }
                  onClick={() => handleDislikeClick(selectedReview.id)}
                />
              </div>
              {error && (
                <p className="text-ember-500 mt-2 text-center text-sm">
                  {error}
                </p>
              )}
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default ReviewSection;
