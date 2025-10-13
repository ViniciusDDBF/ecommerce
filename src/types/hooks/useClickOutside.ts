import type { RefObject } from 'react';

export interface useClickOutsideParams {
  callback: () => void;
  ref: RefObject<HTMLElement | null>;
}
