import React from 'react';

interface DrawerProps {
  isOpen: boolean;
  children?: React.ReactNode;
  position?: 'left' | 'right';
  className?: string;
}

const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  ({ isOpen, children, position = 'right', className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={`fixed top-0 z-30 h-full w-11/12 transform transition-transform duration-300 ease-in-out sm:w-96 md:w-[28rem] ${
          position === 'right'
            ? isOpen
              ? 'right-0 translate-x-0'
              : 'translate-x-full'
            : isOpen
              ? 'left-0 translate-x-0'
              : '-translate-x-full'
        } ${className}`}
      >
        {children}
      </div>
    );
  },
);

export default Drawer;
