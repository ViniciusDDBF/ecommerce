import type { Media } from '../../../types';

export interface MediaDisplayProps {
  media: Media;
  index: number;
  onImageClick: () => void;
}
