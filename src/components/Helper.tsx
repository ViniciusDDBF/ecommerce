import { CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';

type HelperProps = {
  tooltip: React.ReactNode | string;
};

const Helper: React.FC<HelperProps> = ({ tooltip }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative inline-flex items-center justify-center ">
      <CircleQuestionMark
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-ember-400 w-6"
      />

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-9 w-max max-w-xs px-3 py-2 rounded-md bg-charcoal-600 text-charcoal-50 text-sm shadow-lg transition-all duration-200 z-50">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Helper;
