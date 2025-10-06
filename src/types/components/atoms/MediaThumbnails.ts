import type { Media, Orientation } from '../../../types';

export interface MediaThumbnailsProps {
  mediaList: Array<Media>;
  currentIndex: number;
  onSelect: (index: number) => void;
  orientation?: Orientation;
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
}
