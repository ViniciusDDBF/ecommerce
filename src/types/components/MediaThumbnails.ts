export interface MediaThumbnailsProps {
  mediaList: Array<Media>;
  currentIndex: number;
  onSelect: (index: number) => void;
  direction?: 'horizontal' | 'vertical';
  maxThumbnails?: number;
  gridColumns?: number;
  className?: string;
}
