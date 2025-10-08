import type { useScrollLockParams } from '@/types';
import { useEffect } from 'react';

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
