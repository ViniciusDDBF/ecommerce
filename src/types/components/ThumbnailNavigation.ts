export interface ThumbnailNavigationProps {
  images: { url: string; media_type: string }[];
  selectedMedia?: { url: string; media_type: string } | null;
  setSelectedMedia: (media: { url: string; media_type: string } | null) => void;
  productName: string;
  orientation?: 'horizontal' | 'vertical';
}
