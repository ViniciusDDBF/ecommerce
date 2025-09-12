import { useEffect, useRef } from 'react';

const useFocusTrap = (
  isActive: boolean,
  ref: React.RefObject<HTMLDivElement | null>,
  openedByClick: boolean = false, // New parameter to check if opened by click
) => {
  const firstFocusableElement = useRef<HTMLElement | null>(null);
  const lastFocusableElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    ) as NodeListOf<HTMLElement>;

    if (focusableElements.length > 0) {
      firstFocusableElement.current = focusableElements[0];
      lastFocusableElement.current =
        focusableElements[focusableElements.length - 1];

      // Only set initial focus if the dialog was not opened by a click
      if (!openedByClick) {
        firstFocusableElement.current.focus();
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      if (
        event.shiftKey &&
        document.activeElement === firstFocusableElement.current
      ) {
        event.preventDefault();
        lastFocusableElement.current?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastFocusableElement.current
      ) {
        event.preventDefault();
        firstFocusableElement.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, ref, openedByClick]);
};

export default useFocusTrap;
