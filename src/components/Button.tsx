import React from 'react';

type ButtonVariant = 'primary' | 'secondary';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  selected?: boolean; // NEW: Selected state for toggles/navigation
  disabled?: boolean; // NEW: Explicit disabled prop with default styling
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  style?: React.CSSProperties; // NEW: Custom styling override
}

/* ---------------- Spinner Loader ---------------- */
const SpinnerLoader: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg
      className="animate-spin absolute inset-0"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        fill={color}
      />
    </svg>
  </div>
);

/* ---------------- Button Sizes ---------------- */
const buttonSizes = {
  sm: 'px-4 py-2 text-sm font-medium min-h-[36px] gap-2',
  md: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2',
  lg: 'px-8 py-4 text-lg font-semibold min-h-[52px] gap-3',
  full: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2 w-full', // NEW: Full width as size
};

/* ---------------- Variant Styles with Selected States ---------------- */
const getVariantStyles = (
  variant: ButtonVariant,
  selected: boolean = false
) => {
  switch (variant) {
    case 'primary':
      if (selected) {
        // 🎯 PSYCHOLOGY: Selected primary = "This is active AND important"
        // Much more obvious selection with inverted colors and subtle shadow
        return {
          base: 'bg-gradient-to-r from-ember-700 to-ember-800 text-ember-50 border-2 border-ember-400 shadow-lg',
          hover: 'hover:from-ember-600 hover:to-ember-700', // Lighter on hover
          active:
            'active:from-ember-800 active:to-ember-900 active:scale-[0.98]',
          focus: '', // NO FOCUS RING - prevents annoying persistent ring
          loaderColor: '#FFF8F0', // ember-50
        };
      }
      // Default primary (unselected) - reduced glow
      return {
        base: 'bg-gradient-to-r from-ember-500 to-ember-600 text-charcoal-900 border-0 shadow-md',
        hover: 'hover:from-ember-400 hover:to-ember-500 hover:shadow-lg',
        active: 'active:from-ember-600 active:to-ember-700 active:scale-[0.98]',
        focus: '', // NO FOCUS RING
        loaderColor: '#141414', // charcoal-900
      };

    case 'secondary':
      if (selected) {
        // 🎯 PSYCHOLOGY: Selected secondary = "I'm chosen and obvious about it"
        // Strong ember background with dark text for maximum contrast and obviousness
        return {
          base: 'bg-ember-400 text-charcoal-900 border-2 border-ember-500 shadow-lg',
          hover: 'hover:bg-ember-300 hover:text-charcoal-900',
          active: 'active:bg-ember-500 active:scale-[0.98]',
          focus: '', // NO FOCUS RING
          loaderColor: '#141414', // charcoal-900
        };
      }
      // Default secondary (unselected)
      return {
        base: 'bg-charcoal-600 text-ember-400 border border-ember-500/30',
        hover:
          'hover:bg-charcoal-500 hover:border-ember-400 hover:text-ember-300',
        active: 'active:bg-charcoal-700 active:scale-[0.98]',
        focus: '', // NO FOCUS RING
        loaderColor: '#FF9142', // ember-400
      };

    default:
      return getVariantStyles('primary', selected);
  }
};

/* ---------------- Main Component ---------------- */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      variant = 'primary',
      size = 'md',
      loading = false,
      selected = false, // NEW: Default to unselected
      startIcon,
      endIcon,
      disabled = false,
      className = '',
      style, // NEW: Custom style prop
      type = 'button',
      ...props
    },
    ref
  ) => {
    const variantStyles = getVariantStyles(variant, selected);
    const isDisabled = disabled || loading; // Loading also disables the button
    const iconSize = size === 'sm' ? 16 : size === 'lg' ? 20 : 18;

    // Size classes - "full" includes w-full, others don't
    const sizeClasses = buttonSizes[size];

    const classes = [
      // Base button styling - REMOVED focus:outline-none to prevent ring
      'inline-flex items-center justify-center rounded-lg transition-all duration-300 ease-out',
      'select-none outline-none',

      // Size classes
      sizeClasses,

      // Variant-specific classes (only apply interactive styles if not disabled)
      variantStyles.base,
      !isDisabled ? variantStyles.hover : '',
      !isDisabled ? variantStyles.active : '',
      variantStyles.focus,

      // State classes
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',

      // Custom classes
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={classes}
        style={style} // NEW: Apply custom styles
        {...props}
      >
        {/* Start Icon or Loader */}
        {loading ? (
          <SpinnerLoader size={iconSize} color={variantStyles.loaderColor} />
        ) : (
          startIcon && (
            <span className="flex items-center justify-center flex-shrink-0">
              {startIcon}
            </span>
          )
        )}

        {/* Button Text */}
        <span
          className={`flex items-center justify-center ${
            loading ? 'opacity-70' : ''
          }`}
        >
          {text}
        </span>

        {/* End Icon (hidden during loading) */}
        {!loading && endIcon && (
          <span className="flex items-center justify-center flex-shrink-0">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
