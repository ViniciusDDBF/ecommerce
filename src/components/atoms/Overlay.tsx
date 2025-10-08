import type { FC, OverlayProps } from '@/types';

export const Overlay: FC<OverlayProps> = ({ isOpen, onClick }) => {
  if (!isOpen) return null;

  return (
    <button
      aria-label="Close overlay"
      className="bg-charcoal-700/70 fixed inset-0 z-20 h-[100vh] backdrop-blur-sm"
      onClick={onClick}
      type="button"
    />
  );
};
