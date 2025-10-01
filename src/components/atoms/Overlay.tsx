// Overlay.tsx
import React from 'react';

type OverlayProps = {
  isOpen: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, onClick, children }) => {
  if (!isOpen) return null;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    // Close only if background (not child) is clicked
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

export default Overlay;
