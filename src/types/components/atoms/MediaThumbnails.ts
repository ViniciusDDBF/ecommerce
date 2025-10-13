import type { Media, Orientation, Size } from '@/types';

export interface MediaThumbnailsProps {
  mediaList: Media[];
  selected: Media | number | null;
  onSelect: (selected: Media | number) => void;
  selectionMode?: 'object' | 'index';
  layout?: Orientation;
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
  thumbnailSize?: Size;
}
