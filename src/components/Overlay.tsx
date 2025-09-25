import React from 'react';

type OverlayProps = {
  isOpen: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-charcoal-700/70 fixed inset-0 z-20 backdrop-blur-sm">
      {children}
    </div>
  );
};

export default Overlay;
