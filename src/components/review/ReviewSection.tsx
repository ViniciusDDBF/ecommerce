// #region /* ---------- Imports ---------- */

import { useState, useEffect } from 'react';
import { supabase } from '../../SupabaseConfig';
import useScrollLock from '../../hooks/useScrollLock';
import ReviewCarousel from './ReviewCarousel';
import ReviewCard from './ReviewCard';
import ReviewModal from './ReviewModal';
import RatingFilter from './RatingFilter';

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
}

// #endregion

/* ---------- MAIN COMPONENT ---------- */
const ReviewSection = ({ reviews, ratingSummary }: EnhancedReviewCardProps) => {
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
  const [isCarouselMode, setIsCarouselMode] = useState(false);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

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

  const openReviewModal = (
    review: Review,
    mediaIndex: number = 0,
    fromCarousel: boolean = false,
  ) => {
    setSelectedReview(review);
    setCurrentMediaIndex(mediaIndex);
    setIsCarouselMode(fromCarousel);
  };

  const closeReviewModal = () => {
    setSelectedReview(null);
    setCurrentMediaIndex(0);
    setIsCarouselMode(false);
    setError('');
  };

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
  }, [selectedReview, currentMediaIndex, isCarouselMode, reviews]);
  // #endregion

  /* ---------- No reviews card ---------- */
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-charcoal-900 p-4 md:p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <p className="text-charcoal-300 text-lg">No reviews available.</p>
        </div>
      </div>
    );
  }

  const start = (currentPage - 1) * 5;
  const end = start + 5;
  const currentReviews = reviews.slice(start, end);
  const filteredReviews =
    ratingFilter !== null
      ? currentReviews.filter((item) => {
          return item.rating === ratingFilter;
        })
      : currentReviews;
  console.log(reviews);

  return (
    <>
      {/* ---------- All images carousel ---------- */}
      <div>
        <ReviewCarousel reviews={reviews} openReviewModal={openReviewModal} />
      </div>

      <div className="flex justify-center">
        <RatingFilter
          rate1={ratingSummary.rate1}
          rate2={ratingSummary.rate2}
          rate3={ratingSummary.rate3}
          rate4={ratingSummary.rate4}
          rate5={ratingSummary.rate5}
          average={ratingSummary.average_rating}
          onRatingSelect={(e) => setRatingFilter(e)}
        />
      </div>
      {/* ---------- Review card ---------- */}
      <ReviewCard
        updateReviewState={updateReviewState}
        getReviewState={getReviewState}
        openReviewModal={openReviewModal}
        handleLikeClick={handleLikeClick}
        handleDislikeClick={handleDislikeClick}
        reviews={filteredReviews}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={Math.ceil(reviews.length / 5)}
      />

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
        error={error}
      />
    </>
  );
};

export default ReviewSection;
