import type { Imedia } from '@/types';

export interface MediaMainDisplayProps {
  media: Imedia;
  index: number;
  onImageClick?: () => void;
}
