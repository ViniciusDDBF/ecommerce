import React from 'react';

type OverlayProps = {
  isOpen: boolean;
  children: React.ReactNode;
};

const Overlay: React.FC<OverlayProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-charcoal-900/80 glass-effect backdrop-blur-sm ember-transition">
      {children}
    </div>
  );
};

export default Overlay;