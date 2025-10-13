import type { Media, Orientation, Size } from '@/types';

export interface MediaThumbnailsProps {
  className?: string;
  gridColumns?: number;
  layout?: Orientation;
  maxThumbnails?: number;
  mediaList: Media[];
  onSelect: (selected: Media | number) => void;
  selected: Media | number | null;
  selectionMode?: 'object' | 'index';
  thumbnailSize?: Size;
}
