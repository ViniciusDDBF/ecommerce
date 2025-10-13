export interface ProductItem {
  color: string | null;
  current_price: number;
  group_id: number;
  image_url: string[];
  original_price: number;
  product_name: string;
  product_slug: string;
  promotion_id: number | null;
  stock: number;
  variant_id: number;
  variant_name: string;
  variant_query: string;
}

export interface ProductCardProps {
  cardId: string;
  onVariantSelect: (variantId: number) => void;
  selectedVariantId: number;
  variants: ProductItem[];
}
