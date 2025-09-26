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
import { supabase } from './src/SupabaseConfig';
import Button from './src/components/Button';
import Overlay from './src/components/Overlay';
import useScrollLock from './src/hooks/useScrollLock';
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
    return (
      reviewStates[reviewId] || {
        positiveVotes: 0,
        negativeVotes: 0,
        hasLiked: false,
        hasDisliked: false,
        isExpanded: false,
      }
    );
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

      if (error) throw new Error(error.message);

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

      if (error) throw new Error(error.message);

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
    setCurrentMediaIndex((prev) =>
      direction === 'prev'
        ? prev === 0
          ? selectedReview.media.length - 1
          : prev - 1
        : prev === selectedReview.media.length - 1
          ? 0
          : prev + 1,
    );
  };

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

    if (selectedReview) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReview]);
  // #endregion

  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-charcoal-900 p-4">
        <div className="mx-auto max-w-3xl space-y-6">
          <p className="text-charcoal-300 text-base sm:text-lg">
            No reviews available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-charcoal-900 p-4 sm:p-6 md:p-8">
        <div className="mx-auto max-w-3xl space-y-6">
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
                className="glass-effect hover:ember-hover-border rounded-lg p-4 transition sm:p-6 md:p-8"
              >
                {/* Top Section: User Profile */}
                <div className="border-charcoal-600 mb-4 flex flex-col items-start justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="bg-charcoal-700 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                      <span className="text-ember-400 text-base font-bold sm:text-lg">
                        {avatar}
                      </span>
                    </div>
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-charcoal-100 min-w-0 truncate text-base font-semibold sm:text-lg">
                          {displayName}
                        </h3>
                        <span className="bg-ember-500/10 text-ember-400 border-ember-500/20 inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium">
                          <Shield className="mr-1 h-3 w-3" />
                          Verified
                        </span>
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
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`Rating: ${review.rating} out of 5 stars`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 sm:h-5 sm:w-5 ${
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

                {/* Main Content Section */}
                <div className="space-y-4">
                  {/* Content */}
                  <div>
                    <h3 className="text-charcoal-100 mb-3 text-lg font-bold sm:text-xl">
                      {review.title}
                    </h3>
                    <p
                      className={`text-charcoal-300 text-base leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}
                    >
                      {review.content}
                    </p>
                    {review.content.length > 200 && (
                      <button
                        className="text-ember-400 hover:text-ember-500 mt-2 text-sm"
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

                  {/* Media Thumbnails */}
                  {review.media.length > 0 && (
                    <div className="flex justify-center">
                      <div className="grid w-full grid-cols-3 gap-2 sm:gap-3">
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
                                  <video
                                    src={media.url}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    muted
                                    controls={false}
                                    preload="metadata"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <CirclePlay
                                      fill="black"
                                      fillOpacity={0.1}
                                      className="text-ember-400 h-8 w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-10 sm:w-10"
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
                                      fillOpacity={0.2}
                                      className="text-ember-400 h-8 w-8 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:h-10 sm:w-10"
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

                  {/* Vote Buttons */}
                  <div className="border-charcoal-700/50 flex items-center justify-center gap-3 border-t pt-4 sm:gap-4">
                    <Button
                      startIcon={<ThumbsUp className="h-4 w-4" />}
                      text={`Helpful (${positiveVotes})`}
                      variant={hasLiked ? 'secondary' : 'outline'}
                      disabled={hasLiked || hasDisliked}
                      onClick={() => handleLikeClick(review.id)}
                      className="flex-1 sm:flex-none"
                    />
                    <Button
                      startIcon={<ThumbsDown className="h-4 w-4" />}
                      text={`Not Helpful (${negativeVotes})`}
                      variant={hasDisliked ? 'secondary' : 'outline'}
                      disabled={hasLiked || hasDisliked}
                      onClick={() => handleDislikeClick(review.id)}
                      className="flex-1 sm:flex-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlay Modal */}
      {selectedReview && (
        <Overlay onClick={closeReviewModal} isOpen={selectedReview !== null}>
          <div className="bg-charcoal-900/95 sm:bg-charcoal-900/80 fixed inset-0 z-30 flex flex-col md:flex-row md:items-stretch md:justify-end">
            {/* Media Section */}
            <div className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-0">
              {selectedReview.media.length > 0 && (
                <div className="relative max-h-[50vh] w-full md:max-h-[100vh] md:max-w-[calc(100vw-24rem)]">
                  {selectedReview.media[currentMediaIndex].media_type ===
                  'video' ? (
                    <video
                      src={selectedReview.media[currentMediaIndex].url}
                      controls
                      className="max-h-[50vh] w-full rounded-lg object-contain shadow-lg md:max-h-[100vh]"
                      autoPlay
                    />
                  ) : (
                    <img
                      src={selectedReview.media[currentMediaIndex].url}
                      alt={`Review media ${currentMediaIndex + 1}`}
                      className="max-h-[50vh] w-full rounded-lg object-contain shadow-lg md:max-h-[100vh]"
                      onError={(e) =>
                        (e.currentTarget.src = '/fallback-image.jpg')
                      }
                    />
                  )}
                  {selectedReview.media.length > 1 && (
                    <>
                      <button
                        onClick={() => navigateMedia('prev')}
                        className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70 sm:left-4"
                        aria-label="Previous media"
                      >
                        <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8" />
                      </button>
                      <button
                        onClick={() => navigateMedia('next')}
                        className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:bg-black/70 sm:right-4"
                        aria-label="Next media"
                      >
                        <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Review Details Section */}
            <div className="border-charcoal-600 bg-charcoal-800 flex w-full flex-col border-t md:w-96 md:border-t-0 md:border-l">
              {/* Header */}
              <div className="border-charcoal-600 flex items-center justify-between border-b p-4">
                <div className="flex min-w-0 flex-col gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="bg-charcoal-700 flex h-10 w-10 items-center justify-center rounded-full sm:h-12 sm:w-12">
                      <span className="text-ember-400 text-base font-bold sm:text-lg">
                        {selectedReview.is_anonymous
                          ? 'AN'
                          : `${selectedReview.customer.first_name?.[0] || ''}${selectedReview.customer.last_name?.[0] || ''}`}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="min-w-0 truncate font-medium text-white">
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
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
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
                  onClick={closeReviewModal}
                  aria-label="Close modal"
                  className="p-2"
                />
              </div>

              {/* Review Content */}
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                <h3 className="line-clamp-2 text-lg font-bold break-words text-white sm:text-xl">
                  {selectedReview.title}
                </h3>
                <p className="text-charcoal-300 text-base leading-relaxed break-words">
                  {selectedReview.content}
                </p>
                {selectedReview.media.length > 1 && (
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {selectedReview.media.map((media, index) => (
                      <button
                        key={media.id}
                        onClick={() => setCurrentMediaIndex(index)}
                        className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                          index === currentMediaIndex
                            ? 'border-ember-400'
                            : 'hover:border-charcoal-500 border-transparent'
                        }`}
                      >
                        {media.media_type === 'image' ? (
                          <img
                            src={media.url}
                            alt={`Media ${index + 1}`}
                            className="h-full w-full object-cover"
                            onError={(e) =>
                              (e.currentTarget.src = '/fallback-image.jpg')
                            }
                          />
                        ) : (
                          <div className="relative size-full">
                            <video
                              src={media.url}
                              className="h-full w-full object-cover"
                              muted
                              controls={false}
                              preload="metadata"
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer - Vote Buttons */}
              <div className="border-charcoal-600 border-t p-4">
                <div className="flex justify-between gap-3 sm:gap-4">
                  <Button
                    startIcon={<ThumbsUp className="h-4 w-4" />}
                    text={`${getReviewState(selectedReview.id).positiveVotes}`}
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
                    className="flex-1 sm:flex-none"
                  />
                  <Button
                    startIcon={<ThumbsDown className="h-4 w-4" />}
                    text={`${getReviewState(selectedReview.id).negativeVotes}`}
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
                    className="flex-1 sm:flex-none"
                  />
                </div>
                {error && (
                  <p className="text-ember-500 mt-2 text-center text-sm">
                    {error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default ReviewSection;
