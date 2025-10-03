import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/atoms';

interface MediaNavigationProps {
  hasNavigation: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const MediaNavigation: React.FC<MediaNavigationProps> = ({
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
        className="absolute left-0 z-10 mx-4 hidden md:inline-flex" // Added z-10
        aria-label="Previous media"
      />
      <Button
        variant="secondary"
        size="xs"
        startIcon={<ChevronRight className="h-5 w-5 md:h-6 md:w-6" />}
        onClick={onNext}
        className="absolute right-0 z-10 mx-4 hidden md:inline-flex" // Added z-10
        aria-label="Next media"
      />
    </>
  );
};
