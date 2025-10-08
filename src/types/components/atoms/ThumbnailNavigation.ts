import type { IMedia } from '@/types';

export interface ThumbnailNavigationProps {
  images: IMedia[];
  selectedMedia?: IMedia | null;
  setSelectedMedia: (media: IMedia | null) => void;
  productName: string;
  orientation?: 'horizontal' | 'vertical';
}
