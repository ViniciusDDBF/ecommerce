import type { RefObject } from 'react';

export interface useClickOutsideParams {
  ref: RefObject<HTMLElement | null>;
  callback: () => void;
}
