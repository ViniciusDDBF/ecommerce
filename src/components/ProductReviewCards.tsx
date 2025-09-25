import { useState, useEffect } from 'react';
import { Star, Play, Shield, X, ZoomIn, ThumbsUp } from 'lucide-react';

// Star Rating Component
const StarRating = ({ rating, size = 'sm', showNumber = false }) => {
  const sizeClasses = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rating: ${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses} ${
            star <= rating
              ? 'fill-ember-400 text-ember-400'
              : 'text-charcoal-400'
          }`}
          aria-hidden="true"
        />
      ))}
      {showNumber && (
        <span className="text-charcoal-300 ml-1 text-sm font-medium">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

// Badge Component
const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    verified: 'bg-ember-500/10 text-ember-400 border border-ember-500/20',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
};

// Image Modal Component
const ImageModal = ({ isOpen, onClose, src, alt }) => {
  if (!isOpen) return null;

  return (
    <div
      className="bg-charcoal-900/95 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="media-modal-title"
      aria-modal="true"
    >
      <div className="relative max-h-[90vh] w-full max-w-4xl">
        <button
          onClick={onClose}
          className="text-charcoal-300 hover:text-ember-400 absolute -top-12 right-0 transition-colors duration-200"
          aria-label="Close media modal"
        >
          <X className="h-8 w-8" />
        </button>
        <img
          src={src}
          alt={alt}
          className="h-auto max-h-[85vh] w-full rounded-xl object-contain shadow-2xl"
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        />
      </div>
    </div>
  );
};

// Media Thumbnail Component
const MediaThumbnail = ({ type, src, alt, className = '', onClick }) => {
  return (
    <div
      className={`group relative cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${type === 'video' ? 'video' : 'image'}: ${alt}`}
    >
      <div className="bg-charcoal-700 aspect-square overflow-hidden rounded-lg">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => (e.currentTarget.src = '/fallback-image.jpg')}
        />
        <div
          className={`absolute inset-0 flex items-center justify-center ${
            type === 'video'
              ? 'bg-charcoal-900/40'
              : 'bg-charcoal-900/0 group-hover:bg-charcoal-900/20'
          }`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
              type === 'video'
                ? 'bg-ember-500/90 group-hover:bg-ember-400 shadow-ember-500/40'
                : 'bg-charcoal-800/80 opacity-0 group-hover:opacity-100'
            }`}
          >
            {type === 'video' ? (
              <Play
                className="text-charcoal-50 ml-0.5 h-4 w-4"
                fill="currentColor"
              />
            ) : (
              <ZoomIn className="text-charcoal-200 h-4 w-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Single Review Card Component
const ReviewCard = ({ review, isLoggedIn, customerId }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [likeCount, setLikeCount] = useState(review.like_count || 0);
  const [hasLiked, setHasLiked] = useState(false);
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Check if user has liked the review
  useEffect(() => {
    const checkHasLiked = async () => {
      if (!isLoggedIn || !customerId) return;
      try {
        const response = await fetch(`/api/reviews/${review.id}/has-liked`, {
          headers: {
            'Content-Type': 'application/json',
            'X-Customer-Id': customerId,
          },
        });
        if (!response.ok) throw new Error('Failed to check like status');
        const { has_liked } = await response.json();
        setHasLiked(has_liked);
      } catch (err) {
        console.error('Error checking like status:', err);
      }
    };
    checkHasLiked();
  }, [review.id, isLoggedIn, customerId]);

  const handleLikeClick = async () => {
    if (!isLoggedIn || !customerId) {
      setError('Please log in to like this review');
      return;
    }
    if (hasLiked) {
      setError('You have already liked this review');
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${review.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer_id: customerId }),
      });
      if (!response.ok) throw new Error((await response.json()).error);
      const { like_count } = await response.json();
      setLikeCount(parseInt(like_count, 10));
      setHasLiked(true);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to like review');
    }
  };

  const openImageModal = (src, alt) => {
    setSelectedImage({ src, alt });
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const avatar = review.is_anonymous
    ? 'AN'
    : `${review.customer.first_name?.[0] || ''}${review.customer.last_name?.[0] || ''}`;
  const displayName = review.is_anonymous
    ? 'Anonymous'
    : review.customer.first_name;

  return (
    <div className="bg-charcoal-600/80 border-charcoal-400/10 rounded-xl border p-6 backdrop-blur-md md:p-8">
      {/* Top Section: User Profile */}
      <div className="border-charcoal-700/50 mb-6 flex items-start justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="bg-charcoal-700 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-ember-400 text-xl font-bold">{avatar}</span>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex gap-4">
              <h3 className="text-charcoal-100 text-lg font-semibold">
                {displayName}
              </h3>
              <div className="flex justify-end gap-2">
                <Badge variant="verified">
                  <Shield className="mr-1 h-3 w-3" />
                  Verified
                </Badge>
              </div>
            </div>
            <p className="text-charcoal-300 text-sm">
              {new Date(review.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
        <div className="space-y-2 text-right">
          <StarRating rating={review.rating} size="md" showNumber={true} />
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
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
        </div>

        {/* Media Thumbnails */}
        {review.media.length > 0 && (
          <div className="flex justify-center">
            <div className="grid max-w-sm grid-cols-3 gap-3">
              {review.media.map((media, index) => (
                <MediaThumbnail
                  key={media.id}
                  type={media.media_type || 'image'} // Fallback to image
                  src={media.url}
                  alt={`Review media ${index + 1}`}
                  onClick={() =>
                    openImageModal(media.url, `Review media ${index + 1}`)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* Helpful Button */}
        <div className="border-charcoal-700/50 flex items-center justify-center border-t pt-4">
          <button
            onClick={handleLikeClick}
            disabled={hasLiked}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              hasLiked
                ? 'text-charcoal-500 cursor-not-allowed'
                : 'text-charcoal-300 hover:text-ember-400 hover:bg-ember-500/10'
            }`}
            aria-label={`Mark as helpful (${likeCount} likes)`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLikeClick()}
          >
            <ThumbsUp
              className={`h-4 w-4 ${hasLiked ? 'fill-ember-400' : ''}`}
            />
            Helpful? ({likeCount})
          </button>
          {error && <p className="text-ember-500 ml-4 text-sm">{error}</p>}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImage !== null}
        onClose={closeImageModal}
        src={selectedImage?.src}
        alt={selectedImage?.alt}
      />
    </div>
  );
};

// Main Component
const EnhancedReviewCard = ({ reviews, isLoggedIn, customerId }) => {
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
    <div className="bg-charcoal-900 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            isLoggedIn={isLoggedIn}
            customerId={customerId}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedReviewCard;
