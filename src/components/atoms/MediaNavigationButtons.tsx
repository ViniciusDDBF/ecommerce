import type { MediaNavigationProps, FC } from '../../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '.';

export const MediaNavigationButtons: FC<MediaNavigationProps> = ({
  hasNavigation,
  onPrev,
  onNext,
}) => {
  if (!hasNavigation) return null;

  return (
    <>
      <Button
        variant="secondary"
        size="xs"
        startIcon={<ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />}
        onClick={onPrev}
        className="absolute left-0 z-10 mx-4 hidden md:left-2 md:inline-flex" // Added z-10
        aria-label="Previous media"
      />
      <Button
        variant="secondary"
        size="xs"
        startIcon={<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />}
        onClick={onNext}
        className="absolute right-0 z-10 mx-4 hidden md:right-2 md:inline-flex" // Added z-10
        aria-label="Next media"
      />
    </>
  );
};
