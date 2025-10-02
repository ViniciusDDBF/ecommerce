import { useEffect } from 'react';

export const useScrollLock = (isActive: boolean) => {
  useEffect(() => {
    if (isActive) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isActive]);
};
