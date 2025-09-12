type IconOverlayProps = {
  icon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  count?: number;
  showBadge?: boolean;
  // Add any additional props (e.g., for accessibility)
  [key: string]: any; // Allows arbitrary props like tabIndex, role, etc.
};

const IconOverlay: React.FC<IconOverlayProps> = ({
  onClick,
  icon,
  count,
  showBadge,
  ...props // Spread remaining props
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-charcoal-700 hover:bg-charcoal-600 relative inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full align-middle transition-colors"
      {...props} // Spread props to root div
    >
      {/* User Icon */}
      {icon}

      {showBadge && (
        <span className="bg-ember-500 absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white shadow-md">
          {count}
        </span>
      )}
    </div>
  );
};

export default IconOverlay;
