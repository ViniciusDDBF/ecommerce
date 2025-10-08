import type React from 'react';
import type { FC, OverlayProps } from '@/types';

export const Overlay: FC<OverlayProps> = ({ isOpen, onClick, children }) => {
  if (!isOpen) return null;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) {
      onClick?.();
    }
  };

  return (
    <div
      className="bg-charcoal-700/70 fixed inset-0 z-20 h-[100vh] backdrop-blur-sm"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
