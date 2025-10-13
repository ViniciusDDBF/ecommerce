import type { Media } from '@/types';

export interface MediaMainDisplayProps {
  media: Media;
  index: number;
  onImageClick?: () => void;
}
