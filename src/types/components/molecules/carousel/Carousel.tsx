import type { ProductItem } from '@/types';

export interface CarouselProps {
  className?: string;
  data: CarouselItem[];
}

interface CarouselItem {
  carousel_display_order: number;
  carousel_name: string;
  carousel_title: string;
  products: ProductItem[][];
}
