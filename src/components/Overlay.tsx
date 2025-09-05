import React, { type ReactNode } from 'react';

type OverlayProps = {
  isOpen: boolean;
  children: ReactNode;
  onClick?: () => void;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-40 bg-charcoal-700/70 backdrop-blur-sm transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
};

export default Overlay;
