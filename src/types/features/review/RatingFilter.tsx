export interface RatingFilterProps {
  average: number;
  className?: string;
  onRatingSelect?: (rating: number | null) => void;
  rate1: number;
  rate2: number;
  rate3: number;
  rate4: number;
  rate5: number;
  review_count: number;
}
