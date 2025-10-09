import type { Imedia, Torientation, Tsize } from '@/types';

export interface MediaThumbnailsProps {
  mediaList: Imedia[];
  selected: Imedia | number | null;
  onSelect: (selected: Imedia | number) => void;
  selectionMode?: 'object' | 'index';
  layout?: Torientation;
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
  thumbnailSize?: Tsize;
}
