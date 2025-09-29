import { useCallback } from 'react';

type ScrollOptions = {
  offset?: number; // optional pixel offset
  behavior?: ScrollBehavior; // "smooth" | "auto"
};

export function useSmoothScroll() {
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

      // Calculate the element’s absolute top position in the document
      const elementTop = element.offsetTop - offset;

      window.scrollTo({
        top: elementTop,
        behavior,
      });
    },
    [],
  );

  return { scrollTo };
}
