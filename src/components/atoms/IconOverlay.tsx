import type { FC, IconOverlayProps } from '@/types';

export const IconOverlay: FC<IconOverlayProps> = ({
  onClick,
  icon,
  count,
  showBadge,
  ...props
}) => {
  return (
    <button
      aria-label={
        showBadge && count ? `Icon with ${count} notifications` : 'Icon button'
      }
      className="bg-charcoal-700 hover:bg-charcoal-600 relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full align-middle transition-colors sm:h-12 sm:w-12"
      onClick={onClick}
      type="button"
      {...props}
    >
      {/* ---------- Icon ---------- */}
      {icon}

      {showBadge && count !== undefined && (
        <span className="bg-ember-500 text-charcoal-50 absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold shadow-md sm:-top-1.5 sm:-right-1.5 sm:h-5 sm:w-5">
          {count}
        </span>
      )}
    </button>
  );
};
