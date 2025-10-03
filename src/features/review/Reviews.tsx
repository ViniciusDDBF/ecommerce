import { useState, useEffect, useMemo, useRef } from 'react';
import { Button, Modal } from '../../components/atoms';
import {
  EmptyReviewCard,
  ReviewCarousel,
  ReviewCard,
  ReviewModal,
  RatingFilter,
  RatingCircle,
  CreateReviewModal,
} from '..';
import { useScrollLock, useSmoothScroll } from '../../hooks';
import { useAppSelector } from '../../store/hooks/hooks';
import { supabase } from '../../SupabaseConfig';

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

export interface Media {
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

interface RatingSummary {
  average_rating: number;
  review_count: number;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
}

interface EnhancedReviewCardProps {
  reviews: Review[];
  isLoggedIn: boolean;
  ratingSummary: RatingSummary;
  productId: number;
}

// #endregion

/* ---------- MAIN COMPONENT ---------- */
export const Reviews = ({
  reviews,
  ratingSummary,
  productId,
}: EnhancedReviewCardProps) => {
  // #region /* ---------- Hooks/State ---------- */

  const user = useAppSelector('user');
  const [needsToLogIn, setNeedsToLogIn] = useState(false);
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
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<string>('latest'); // Being defined in ReviewSortBy
  const [createReview, setCreateReview] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const pageSize = 5;
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

  /* ---------- Like click handler ---------- */
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

  /* ---------- Dislike click handler ---------- */
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

  /* ---------- Open review modal ---------- */
  const openReviewModal = (
    review: Review,
    mediaIndex: number = 0,
    fromCarousel: boolean = false,
  ) => {
    setSelectedReview(review);
    setCurrentMediaIndex(mediaIndex);
    setIsCarouselMode(fromCarousel);
  };

  /* ---------- Close review modal ---------- */
  const closeReviewModal = () => {
    setSelectedReview(null);
    setCurrentMediaIndex(0);
    setIsCarouselMode(false);
    setError('');
  };

  /* ---------- Navigate the images ---------- */
  const navigateMedia = (direction: 'prev' | 'next') => {
    if (!selectedReview) return;

    if (!isCarouselMode || selectedReview.media.length === 0) {
      // Default cycling behavior within the current review
      if (direction === 'prev') {
        setCurrentMediaIndex((prev) =>
          prev === 0 ? selectedReview.media.length - 1 : prev - 1,
        );
      } else {
        setCurrentMediaIndex((prev) =>
          prev === selectedReview.media.length - 1 ? 0 : prev + 1,
        );
      }
      return;
    }

    // Carousel mode: Navigate within review, overflow to next/prev review with media
    const reviewsWithMedia = reviews.filter((r) => r.media.length > 0);
    const currentReviewIndex = reviewsWithMedia.findIndex(
      (r) => r.id === selectedReview.id,
    );
    if (currentReviewIndex === -1) return;

    if (direction === 'next') {
      if (currentMediaIndex < selectedReview.media.length - 1) {
        setCurrentMediaIndex(currentMediaIndex + 1);
      } else {
        const nextReviewIndex =
          (currentReviewIndex + 1) % reviewsWithMedia.length;
        setSelectedReview(reviewsWithMedia[nextReviewIndex]);
        setCurrentMediaIndex(0);
      }
    } else {
      // 'prev'
      if (currentMediaIndex > 0) {
        setCurrentMediaIndex(currentMediaIndex - 1);
      } else {
        const prevReviewIndex =
          (currentReviewIndex - 1 + reviewsWithMedia.length) %
          reviewsWithMedia.length;
        setSelectedReview(reviewsWithMedia[prevReviewIndex]);
        setCurrentMediaIndex(
          reviewsWithMedia[prevReviewIndex].media.length - 1,
        );
      }
    }
  };

  /* ---------- Handle keyboard navigation ---------- */
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
  }, [selectedReview, currentMediaIndex, isCarouselMode, reviews]);

  /* ---------- Sorting / Filtering / Pagination ---------- */
  const processedReviews = useMemo(() => {
    let result = [...reviews];
    if (!result) return;

    /* ---------- Filtering ---------- */
    if (ratingFilter !== null) {
      result = reviews.filter((item) => {
        return item.rating === ratingFilter;
      });
    }

    /* ---------- Sorting ---------- */
    if (sortBy === 'positive_votes') {
      result.sort((a, b) => b.positive_votes - a.positive_votes);
    } else if (sortBy === 'negative_votes') {
      result.sort((a, b) => b.negative_votes - a.negative_votes);
    } else if (sortBy === 'latest') {
      result.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    } else if (sortBy === 'oldest') {
      result.sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
      );
    }

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return result.slice(start, end);
  }, [reviews, ratingFilter, sortBy, currentPage]);

  /* ---------- Total Pages ---------- */
  const totalPages = useMemo(() => {
    const base = ratingFilter
      ? reviews.filter((r) => r.rating === ratingFilter)
      : reviews;
    return Math.ceil(base.length / pageSize);
  }, [reviews, ratingFilter]);

  // #endregion

  /* ---------- No reviews card ---------- */
  if (!reviews || reviews.length === 0) {
    return (
      <>
        <div className="bg-charcoal-900 p-10">
          <EmptyReviewCard
            onClick={() => {
              console.log('vini');
              setCreateReview(true);
              console.log(createReview);
            }}
          />
        </div>
        <CreateReviewModal
          onClose={() => setCreateReview(!createReview)}
          isOpen={createReview}
          productId={productId}
        />
      </>
    );
  }

  return (
    <>
      {/* ---------- All images carousel ---------- */}
      <ReviewCarousel
        reviews={reviews}
        openReviewModal={openReviewModal}
        className="border-charcoal-700 mt-20 md:border-y-1"
      />

      {/* ---------- Review Summary ---------- */}
      <div className="bg-charcoal-800 border-charcoal-700 items-center gap-4 py-10 text-center md:border-y-1">
        <h1 className="text-charcoal-50 my-10 text-2xl">Customers reviews</h1>
        <div className="md:flex md:justify-center">
          <RatingCircle
            average={ratingSummary.average_rating}
            review_count={ratingSummary.review_count}
            className=""
          />
          <RatingFilter
            rate1={ratingSummary.rate1}
            rate2={ratingSummary.rate2}
            rate3={ratingSummary.rate3}
            rate4={ratingSummary.rate4}
            rate5={ratingSummary.rate5}
            review_count={ratingSummary.review_count}
            average={ratingSummary.average_rating}
            onRatingSelect={(e) => {
              setRatingFilter(e);
              setCurrentPage(1);
              scrollTo(sectionRef.current);
            }}
            className="md:border-charcoal-700 md:border-x-1"
          />
          <div className="flex items-center justify-center p-4">
            <Button
              onClick={() => {
                if (user.user === null) {
                  setNeedsToLogIn(true);
                  return;
                }
                setCreateReview(true);
              }}
              text="Write a review"
            />
          </div>
        </div>
      </div>

      {/* ---------- Review card ---------- */}
      <div ref={sectionRef}>
        <ReviewCard
          updateReviewState={updateReviewState}
          getReviewState={getReviewState}
          openReviewModal={openReviewModal}
          handleLikeClick={handleLikeClick}
          handleDislikeClick={handleDislikeClick}
          reviews={processedReviews ? processedReviews : reviews}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={totalPages}
          onSortBy={(e) => {
            setSortBy(e);
          }}
        />
      </div>

      {/* ---------- Review modal ---------- */}
      <ReviewModal
        selectedReview={selectedReview}
        currentMediaIndex={currentMediaIndex}
        getReviewState={getReviewState}
        setCurrentMediaIndex={setCurrentMediaIndex}
        navigateMedia={navigateMedia}
        closeReviewModal={closeReviewModal}
        handleLikeClick={handleLikeClick}
        handleDislikeClick={handleDislikeClick}
        isCarouselMode={isCarouselMode}
        error={error}
      />

      {/* ---------- Create Review modal ---------- */}
      <CreateReviewModal
        onClose={() => setCreateReview(!createReview)}
        isOpen={createReview}
        productId={productId}
      />

      <Modal
        isOpen={needsToLogIn}
        title="Need to log in"
        message="You need to be logged in to create a review"
        buttons={{
          cancel: {
            text: 'Close',
            onClick: () => setNeedsToLogIn(false),
          },
        }}
      />
    </>
  );
};
