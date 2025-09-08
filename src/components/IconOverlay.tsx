type IconOverlay = {
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  count?: number;
  showBadge?: boolean;
};

const IconOverlay: React.FC<IconOverlay> = ({
  onClick,
  icon,
  count,
  showBadge,
}) => {
  return (
    <div
      onClick={onClick}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-charcoal-700 hover:bg-charcoal-600 transition-colors cursor-pointer align-middle"
    >
      {/* User Icon */}
      {icon}

      {showBadge && (
        <span className="absolute -top-1.5 -right-1.5 bg-ember-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
          {count}
        </span>
      )}
    </div>
  );
};

export default IconOverlay;
