import type { RefObject } from 'react';

export interface useFocusTrapParams {
  isActive: boolean;
  openedByClick: boolean;
  ref: RefObject<HTMLDivElement | null>;
}
