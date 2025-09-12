import { useEffect } from 'react';

const useScrollLock = (isActive: boolean) => {
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

export default useScrollLock;