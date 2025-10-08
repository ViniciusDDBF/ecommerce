import type { IMedia } from '@/types';

export interface MediaDisplayProps {
  media: IMedia;
  index: number;
  onImageClick?: () => void;
}
