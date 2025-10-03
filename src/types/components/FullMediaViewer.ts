import type { ReturnVoid } from '../Common';
export interface FullMediaViewerProps {
  mediaUrl: string;
  alt: string;
  isOpen: boolean;
  onClose: ReturnVoid;
}
