import type { Media } from '@/types';

export interface MediaMainDisplayProps {
  index: number;
  media: Media;
  onImageClick?: () => void;
}
