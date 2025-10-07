import { useEffect } from 'react';
import type { useScrollLockParams } from '../types/hooks/useScrollLock';

export const useScrollLock = ({ isActive }: useScrollLockParams): void => {
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
