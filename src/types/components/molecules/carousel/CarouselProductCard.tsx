export interface ProductItem {
  group_id: number;
  product_name: string;
  product_slug: string;
  variant_id: number;
  variant_name: string;
  current_price: number;
  original_price: number;
  stock: number;
  image_url: string[];
  promotion_id: number | null;
  variant_query: string;
  color: string | null;
}

export interface ProductCardProps {
  variants: ProductItem[];
  selectedVariantId: number;
  onVariantSelect: (variantId: number) => void;
  cardId: string; 
}
