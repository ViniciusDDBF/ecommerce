import type { ProductItem } from '@/types';

interface CarouselItem {
  carousel_display_order: number;
  carousel_name: string;
  carousel_title: string;
  products: ProductItem[][];
}

export interface CarouselProps {
  className?: string;
  data: CarouselItem[];
}
