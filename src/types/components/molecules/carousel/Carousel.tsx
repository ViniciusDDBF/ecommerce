import type { ProductItem } from '../../../../types';

interface CarouselItem {
  carousel_name: string;
  carousel_title: string;
  carousel_display_order: number;
  products: ProductItem[][];
}

export interface CarouselProps {
  data: CarouselItem[];
  className?: string;
}
