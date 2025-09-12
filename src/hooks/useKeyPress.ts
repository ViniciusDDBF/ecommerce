import { useCallback } from 'react';

// Hook to handle Enter and Space key presses for accessibility
const useKeyPress = (onClick?: React.MouseEventHandler<HTMLElement>) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent default behavior like scrolling on Space
        onClick?.(event as any); // Call the onClick handler
      }
    },
    [onClick],
  );

  return handleKeyDown;
};

export default useKeyPress;
