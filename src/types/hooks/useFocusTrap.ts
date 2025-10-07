import type { RefObject } from 'react';

export interface useFocusTrapParams {
  isActive: boolean;
  ref: RefObject<HTMLDivElement | null>;
  openedByClick: boolean;
}
