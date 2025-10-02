import { useCallback } from 'react';

type ScrollOptions = {
  offset?: number; // optional pixel offset (e.g., to account for fixed headers)
  behavior?: ScrollBehavior; // "smooth" | "auto"
};

export const useSmoothScroll = () => {
  const scrollTo = useCallback(
    (target: string | HTMLElement | null, options: ScrollOptions = {}) => {
      const { offset = 0, behavior = 'smooth' } = options;

      let element: HTMLElement | null = null;

      if (typeof target === 'string') {
        element = document.getElementById(target);
      } else if (target instanceof HTMLElement) {
        element = target;
      }

      if (!element) return;

      // Calculate absolute top position relative to document
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY - offset;

      window.scrollTo({
        top: elementTop,
        behavior,
      });
    },
    [],
  );

  return { scrollTo };
};
