import type { IMedia, TOrientation, TSize } from '../../../types';

export interface MediaThumbnailNavigationProps {
  mediaList: IMedia[];
  selected: IMedia | number | null;
  onSelect: (
    selected: IMedia | number,
  ) => void | React.Dispatch<React.SetStateAction<IMedia | null>>;
  selectionMode?: 'object' | 'index';
  layout?: TOrientation;
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
  thumbnailSize?: TSize;
}
