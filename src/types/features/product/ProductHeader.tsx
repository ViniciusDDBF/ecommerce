export interface ProductHeaderProps {
  productName: string;
  currentPrice: number;
  originalPrice: number;
  averageRating: number;
  reviewCount: number;
  onClick?: () => void;
}