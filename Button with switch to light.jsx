import React, { forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

/* ---------------- Enhanced Spinner Loader ---------------- */
const SpinnerLoader: React.FC<{
  size: ButtonSize;
  color: string;
}> = ({ size, color }) => {
  // Size mappings for spinners to match button proportions
  const spinnerConfig = {
    sm: { diameter: 16, strokeWidth: 2, className: 'w-4 h-4' },
    md: { diameter: 20, strokeWidth: 2, className: 'w-5 h-5' },
    lg: { diameter: 24, strokeWidth: 2.5, className: 'w-6 h-6' },
    full: { diameter: 20, strokeWidth: 2, className: 'w-5 h-5' },
  };

  const config = spinnerConfig[size];

  return (
    <div className={`relative ${config.className}`}>
      <svg
        className="absolute inset-0 animate-spin"
        width={config.diameter}
        height={config.diameter}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth={config.strokeWidth}
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
};

/* ---------------- Button Sizes ---------------- */
const buttonSizes = {
  sm: 'px-4 py-2 text-sm font-medium min-h-[36px] gap-2',
  md: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2',
  lg: 'px-8 py-4 text-lg font-semibold min-h-[52px] gap-3',
  full: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2 w-full',
};

/* ---------------- Variant Styles with Selected States ---------------- */
const getVariantStyles = (
  variant: ButtonVariant,
  selected: boolean = false,
) => {
  switch (variant) {
    case 'primary':
      if (selected) {
        return {
          base: 'bg-black dark:bg-gradient-to-r dark:from-ember-700 dark:to-ember-800 text-white dark:text-ember-50 border-2 border-gray-600 dark:border-ember-400 shadow-lg',
          hover:
            'hover:bg-gray-800 hover:shadow-xl dark:hover:from-ember-600 dark:hover:to-ember-700  transition-transform',
          active:
            'active:bg-black dark:active:from-ember-800 dark:active:to-ember-900 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
          disabled: 'opacity-50 cursor-not-allowed',
          loaderColor: '#FFFFFF dark:#FFF8F0', // white for light, ember-50 for dark
        };
      }
      return {
        base: 'bg-black dark:bg-gradient-to-r dark:from-ember-500 dark:to-ember-600 text-white dark:text-charcoal-900 border-0 shadow-md',
        hover:
          'hover:bg-gray-800 hover:shadow-lg dark:hover:from-ember-400 dark:hover:to-ember-500  transition-transform',
        active:
          'active:bg-black dark:active:from-ember-600 dark:active:to-ember-700 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
        disabled: 'opacity-50 cursor-not-allowed',
        loaderColor: '#FFFFFF dark:#141414', // white for light, charcoal-900 for dark
      };
    case 'secondary':
      if (selected) {
        return {
          base: 'bg-black dark:bg-ember-400 text-white dark:text-charcoal-900 border-2 border-gray-600 dark:border-ember-500 shadow-lg',
          hover:
            'hover:bg-gray-800 hover:shadow-xl dark:hover:bg-ember-300  transition-transform',
          active:
            'active:bg-black dark:active:bg-ember-500 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
          disabled: 'opacity-50 cursor-not-allowed',
          loaderColor: '#FFFFFF dark:#141414', // white for light, charcoal-900 for dark
        };
      }
      return {
        base: 'bg-gray-200 dark:bg-charcoal-600 text-gray-800 dark:text-ember-400 border border-gray-300 dark:border-ember-500/30',
        hover:
          'hover:bg-gray-100 hover:border-gray-400 dark:hover:bg-charcoal-500 dark:hover:border-ember-400 hover:text-gray-900 dark:hover:text-ember-300  transition-transform',
        active:
          'active:bg-gray-300 dark:active:bg-charcoal-700 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
        disabled: 'opacity-50 cursor-not-allowed',
        loaderColor: '#374151 dark:#FF9142', // gray-700 for light, ember-400 for dark
      };
    case 'ghost':
      if (selected) {
        return {
          base: 'bg-black/10 dark:bg-ember-500/10 text-white dark:text-ember-400 border border-gray-500/40 dark:border-ember-500/40',
          hover:
            'hover:bg-black/20 dark:hover:bg-ember-500/20 hover:text-gray-100 dark:hover:text-ember-300 hover:border-gray-400/60 dark:hover:border-ember-400/60  transition-transform',
          active:
            'active:bg-black/30 dark:active:bg-ember-500/30 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
          disabled: 'opacity-50 cursor-not-allowed',
          loaderColor: '#FFFFFF dark:#FF9142', // white for light, ember-400 for dark
        };
      }
      return {
        base: 'bg-transparent text-gray-600 dark:text-charcoal-300 border border-transparent',
        hover:
          'hover:bg-gray-100/50 dark:hover:bg-charcoal-700/50 hover:text-white dark:hover:text-ember-400 hover:border-gray-200/20 dark:hover:border-ember-500/20  transition-transform',
        active:
          'active:bg-gray-200/50 dark:active:bg-charcoal-600/50 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
        disabled: 'opacity-50 cursor-not-allowed',
        loaderColor: '#4B5563 dark:#888888', // gray-600 for light, charcoal-300 for dark
      };
    case 'outline':
      if (selected) {
        return {
          base: 'bg-black/15 dark:bg-ember-500/15 text-white dark:text-ember-400 border-2 border-gray-600 dark:border-ember-500 shadow-lg',
          hover:
            'hover:bg-black/25 dark:hover:bg-ember-500/25 hover:text-gray-100 dark:hover:text-ember-300 hover:border-gray-500 dark:hover:border-ember-400  transition-transform',
          active:
            'active:bg-black/35 dark:active:bg-ember-500/35 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
          disabled: 'opacity-50 cursor-not-allowed',
          loaderColor: '#FFFFFF dark:#FF9142', // white for light, ember-400 for dark
        };
      }
      return {
        base: 'bg-transparent text-gray-600 dark:text-charcoal-300 border-2 border-gray-400 dark:border-charcoal-500',
        hover:
          'hover:bg-gray-100/30 dark:hover:bg-charcoal-700/30 hover:text-white dark:hover:text-ember-400 hover:border-gray-500 dark:hover:border-ember-500  transition-transform',
        active:
          'active:bg-gray-200/40 dark:active:bg-charcoal-600/40 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 dark:focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-charcoal-900',
        disabled: 'opacity-50 cursor-not-allowed',
        loaderColor: '#4B5563 dark:#888888', // gray-600 for light, charcoal-300 for dark
      };
    default:
      return getVariantStyles('primary', selected);
  }
};

/* ---------------- Main Component ---------------- */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      text,
      variant = 'primary',
      size = 'md',
      loading = false,
      selected = false,
      startIcon,
      endIcon,
      disabled = false,
      className = '',
      style,
      type = 'button',
      onClick,
      ...props
    },
    ref,
  ) => {
    const variantStyles = getVariantStyles(variant, selected);
    const isDisabled = disabled || loading;

    const sizeClasses = buttonSizes[size];

    const classes = [
      'inline-flex items-center justify-center rounded-lg transition-all duration-200 ease-out select-none outline-none',
      sizeClasses,
      variantStyles.base,
      !isDisabled ? variantStyles.hover : '',
      !isDisabled ? variantStyles.active : '',
      !isDisabled ? variantStyles.focus : '',
      isDisabled ? variantStyles.disabled : 'cursor-pointer',
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
        style={style}
        onClick={onClick}
        {...props}
      >
        {/* Start Icon or Loader */}
        {loading ? (
          <SpinnerLoader size={size} color={variantStyles.loaderColor} />
        ) : (
          startIcon && (
            <span className="flex flex-shrink-0 items-center justify-center">
              {startIcon}
            </span>
          )
        )}

        {/* Button Text */}
        <span
          className={`relative z-10 flex items-center justify-center ${
            loading ? 'opacity-70' : ''
          }`}
        >
          {text}
        </span>

        {/* End Icon (hidden during loading) */}
        {!loading && endIcon && (
          <span className="relative z-10 flex flex-shrink-0 items-center justify-center">
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;

