export interface ProductHeaderProps {
  averageRating: number;
  currentPrice: number;
  onClick?: () => void;
  originalPrice: number;
  productName: string;
  reviewCount: number;
}
