import type { useKeyPressParams } from '@/types';
import { type KeyboardEventHandler, useCallback } from 'react';

/**
 * Triggers the provided click handler when Enter or Space is pressed.
 * Prevents the default key behavior for accessibility consistency.
 *
 * @param onClick - Function to execute on Enter or Space key press
 * @returns Keyboard event handler for use in JSX elements
 *
 * @example
 * ```tsx
 * const handleClick = () => console.log('Activated');
 * const onKeyPress = useKeyPress({ onClick: handleClick });
 *
 * return <div tabIndex={0} onKeyDown={onKeyPress}>Press Enter or Space</div>;
 * ```
 */

export const useKeyPress = ({
  onClick,
}: useKeyPressParams): KeyboardEventHandler<HTMLElement> => {
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
