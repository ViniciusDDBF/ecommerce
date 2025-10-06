import { useCallback } from 'react';

export const useKeyPress = (onClick?: React.MouseEventHandler<HTMLElement>) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick?.(event as any);
      }
    },
    [onClick],
  );

  return handleKeyDown;
};
