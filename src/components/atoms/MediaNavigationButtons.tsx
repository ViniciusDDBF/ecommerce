import type { FC, MediaNavigationProps } from '@/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/atoms';

export const MediaNavigationButtons: FC<MediaNavigationProps> = ({
  hasNavigation,
  onPrev,
  onNext,
}) => {
  if (!hasNavigation) return null;

  return (
    <>
      <Button
        aria-label="Previous media"
        className="absolute left-0 z-10 mx-4 hidden md:left-2 md:inline-flex" // Added z-10
        onClick={onPrev}
        size="xs"
        startIcon={<ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />}
        variant="secondary"
      />
      <Button
        aria-label="Next media"
        className="absolute right-0 z-10 mx-4 hidden md:right-2 md:inline-flex" // Added z-10
        onClick={onNext}
        size="xs"
        startIcon={<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />}
        variant="secondary"
      />
    </>
  );
};
