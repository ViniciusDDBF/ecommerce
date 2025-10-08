import type { useClickOutsideParams } from '@/types/';
import { useEffect } from 'react';

/**
 * Calls the callback when a click occurs outside the given element.
 * Automatically cleans up the event listener on unmount.
 *
 * @param ref - Ref to the element to detect outside clicks for
 * @param callback - Function executed on outside click
 * @returns void
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useClickOutside(ref, () => console.log('Clicked outside'));
 * <div ref={ref}>Content</div>
 * ```
 */

export const useClickOutside = ({
  ref,
  callback,
}: useClickOutsideParams): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};
