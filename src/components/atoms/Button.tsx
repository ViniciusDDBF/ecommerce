import type {
  ButtonProps,
  SpinnerLoaderProps,
  GetVariantStylesParams,
  VariantStyles,
} from '../../types';
import React from 'react';

/* ----------- Spinner Loader ----------- */
const SpinnerLoader: React.FC<SpinnerLoaderProps> = ({ size, color }) => {
  const spinnerConfig = {
    xs: { diameter: 14, strokeWidth: 2, className: 'w-3.5 h-3.5' },
    sm: { diameter: 16, strokeWidth: 2, className: 'w-4 h-4' },
    md: { diameter: 18, strokeWidth: 2, className: 'w-4.5 h-4.5' },
    lg: { diameter: 20, strokeWidth: 2.5, className: 'w-5 h-5' },
    xl: { diameter: 22, strokeWidth: 2.75, className: 'w-6 h-6' },
    full: { diameter: 18, strokeWidth: 2, className: 'w-4.5 h-4.5' },
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

/* ----------- Button Sizes ----------- */
const buttonSizes = {
  xs: 'px-2 py-1 text-xs font-medium min-h-[32px] gap-1.5',
  sm: 'px-3 py-1.5 text-sm font-medium min-h-[36px] gap-1.5 sm:px-4 sm:py-2',
  md: 'px-4 py-2 text-sm font-semibold min-h-[40px] gap-2 sm:px-5 sm:py-2.5 sm:text-base sm:min-h-[44px]',
  lg: 'px-5 py-2.5 text-base font-semibold min-h-[44px] gap-2 sm:px-6 sm:py-3 sm:min-h-[48px]',
  xl: 'px-6 py-3 text-base font-semibold min-h-[48px] gap-2 sm:px-7 sm:py-4 sm:min-h-[52px]',
  full: 'px-4 py-2 text-sm font-semibold min-h-[40px] gap-2 sm:px-6 sm:py-3 sm:text-base sm:min-h-[44px] w-full',
};

/* ----------- Variant Styles ----------- */
const getVariantStyles = ({
  variant,
  selected = false,
}: GetVariantStylesParams): VariantStyles => {
  switch (variant) {
    case 'primary':
      if (selected) {
        return {
          base: 'bg-gradient-to-r from-ember-700 to-ember-800 text-ember-50 border-2 border-ember-400 shadow-lg',
          hover: 'hover:from-ember-600 hover:to-ember-700',
          active:
            'active:from-ember-800 active:to-ember-900 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
          loaderColor: '#FFF8F0',
        };
      }
      return {
        base: 'bg-gradient-to-r from-ember-500 to-ember-600 text-charcoal-900 border-0 shadow-md',
        hover:
          'hover:from-ember-400 hover:to-ember-500 hover:shadow-lg hover:text-charcoal-700',
        active:
          'active:from-ember-600 active:to-ember-700 active:scale-[0.98] active:text-charcoal-900',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
        loaderColor: '#141414',
      };
    case 'secondary':
      if (selected) {
        return {
          base: 'bg-ember-400 text-charcoal-900 border-2 border-ember-500 shadow-lg',
          hover: 'hover:bg-ember-300 hover:text-charcoal-900',
          active: 'active:bg-ember-500 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
          loaderColor: '#141414',
        };
      }
      return {
        base: 'bg-charcoal-600 text-ember-400 border border-ember-500/30',
        hover:
          'hover:bg-charcoal-500 hover:border-ember-400 hover:text-ember-300',
        active: 'active:bg-charcoal-700 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
        loaderColor: '#FF9142',
      };
    case 'ghost':
      if (selected) {
        return {
          base: 'bg-ember-500/10 text-ember-400 border border-ember-500/40',
          hover:
            'hover:bg-ember-500/20 hover:text-ember-300 hover:border-ember-400/60',
          active: 'active:bg-ember-500/30 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
          loaderColor: '#FF9142',
        };
      }
      return {
        base: 'bg-transparent text-charcoal-300 border border-transparent',
        hover:
          'hover:bg-charcoal-700/50 hover:text-ember-400 hover:border-ember-500/20',
        active: 'active:bg-charcoal-600/50 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
        loaderColor: '#888888',
      };
    case 'outline':
      if (selected) {
        return {
          base: 'bg-charcoal-600/15 text-charcoal-200 border-2 border-charcoal-200 shadow-lg',
          hover: 'cursor-auto',
          active: 'active:bg-charcoal-500/35 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
          loaderColor: '#FF9142',
        };
      }
      return {
        base: 'bg-transparent text-charcoal-300 border-2 border-charcoal-500',
        hover:
          'hover:bg-charcoal-500/30 hover:text-charcoal-200 hover:border-charcoal-500',
        active: 'active:bg-charcoal-600/40 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900',
        loaderColor: '#888888',
      };
    default:
      return getVariantStyles({ variant: 'primary', selected });
  }
};

/* ----------- Main Component ----------- */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
    const variantStyles = getVariantStyles({ variant, selected });
    const isDisabled = disabled || loading;
    const sizeClasses = buttonSizes[size];

    const classes = [
      'inline-flex items-center justify-center rounded-lg transition ease-out select-none outline-none',
      sizeClasses,
      variantStyles.base,
      !isDisabled ? variantStyles.hover : '',
      !isDisabled ? variantStyles.active : '',
      !isDisabled ? variantStyles.focus : '',
      isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
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
        {loading ? (
          <SpinnerLoader size={size} color={variantStyles.loaderColor} />
        ) : (
          startIcon && (
            <span className="flex flex-shrink-0 items-center justify-center">
              {startIcon}
            </span>
          )
        )}

        {text && <span className={loading ? 'opacity-70' : ''}>{text}</span>}

        {!loading && endIcon && (
          <span className="flex flex-shrink-0 items-center justify-center">
            {endIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
