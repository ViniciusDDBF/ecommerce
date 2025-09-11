import { useEffect, useRef } from 'react';

// List of focusable elements based on common accessibility practices
const FOCUSABLE_SELECTOR = `
  a[href], button:not([disabled]), 
  input:not([disabled]), select:not([disabled]), 
  textarea:not([disabled]), [tabindex]:not([tabindex="-1"])
`;

export const useFocusTrap = (ref: React.RefObject<HTMLElement | null>) => {
  const focusableElements = useRef<HTMLElement[] | null>([]);

  // Find all focusable elements within the ref
  const updateFocusableElements = () => {
    if (!ref.current) return;
    focusableElements.current = Array.from(
      ref.current.querySelectorAll(FOCUSABLE_SELECTOR),
    ) as HTMLElement[];
  };

  // Handle Tab and Shift+Tab navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Tab' || !focusableElements?.current?.length) return;

    const firstElement = focusableElements.current[0];
    const lastElement =
      focusableElements.current[focusableElements.current.length - 1];
    const activeElement = document.activeElement as HTMLElement;

    if (event.shiftKey) {
      // Shift+Tab: Move to last element if on first or outside
      if (
        activeElement === firstElement ||
        !focusableElements.current.includes(activeElement)
      ) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab: Move to first element if on last or outside
      if (
        activeElement === lastElement ||
        !focusableElements.current.includes(activeElement)
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    // Initialize focusable elements
    updateFocusableElements();

    // Add keydown listener
    const element = ref.current;
    element.addEventListener('keydown', handleKeyDown);

    // Focus the first focusable element on mount
    if (focusableElements.current && focusableElements.current.length > 0) {
      focusableElements.current[0].focus();
    } else {
      element.focus(); // Fallback to dialog itself
    }

    // Update focusable elements on DOM changes
    const observer = new MutationObserver(updateFocusableElements);
    observer.observe(element, { childList: true, subtree: true });

    return () => {
      element.removeEventListener('keydown', handleKeyDown);
      observer.disconnect();
    };
  }, [ref]);

  return { focusTrapRef: ref };
};
