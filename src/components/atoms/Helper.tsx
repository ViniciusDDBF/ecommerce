import { CircleQuestionMark } from 'lucide-react';
import { useState } from 'react';

type HelperProps = {
  tooltip: React.ReactNode | string;
  value: React.ReactNode | string;
  onClick?: (value: any) => void;
};

const Helper: React.FC<HelperProps> = ({ tooltip, value, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const classes = [
    'relative inline-flex items-center justify-center',
    value ? 'cursor-pointer' : '',
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <div
      onClick={() => {
        if (onClick) onClick(value);
      }}
      className={classes}
    >
      <CircleQuestionMark
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-ember-400 w-6"
      />

      {isHovered && (
        <div className="bg-charcoal-600 text-charcoal-50 fixed top-44 left-101 z-50 w-max max-w-xs rounded-md px-3 py-2 text-sm shadow-lg transition-all duration-200">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default Helper;
