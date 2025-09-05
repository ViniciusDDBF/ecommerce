import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, children }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed right-0 top-0 h-full w-[30vw] glass-effect transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {children}
      </div>
    );
  }
);

Drawer.displayName = 'Drawer';

export default Drawer;
