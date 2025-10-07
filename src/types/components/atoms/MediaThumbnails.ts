import type { IMedia, TOrientation } from '../../../types';

export interface MediaThumbnailsProps {
  mediaList: Array<IMedia>;
  currentIndex: number;
  onSelect: (index: number) => void;
  orientation?: TOrientation;
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
}
