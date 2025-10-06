import type { MediaThumbnail } from '../../../types';

export interface ThumbnailNavigationProps {
  images: MediaThumbnail[];
  selectedMedia?: MediaThumbnail | null;
  setSelectedMedia: (media: MediaThumbnail | null) => void;
  productName: string;
  orientation?: 'horizontal' | 'vertical';
}
