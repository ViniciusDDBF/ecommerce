import { useCallback } from 'react';
import type { useScrollParams } from '../types/hooks/useSmoothScroll';

export const useScroll = () => {
  const scrollTo = useCallback(({ target, options = {} }: useScrollParams): void => {
    const { offset = 0, behavior = 'smooth' } = options;

    let element: HTMLElement | null = null;

    element = target;

    if (!element) return;

    // Calculate absolute top position relative to document
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + window.scrollY - offset;

    window.scrollTo({
      top: elementTop,
      behavior,
    });
  }, []);

  return { scrollTo };
};
