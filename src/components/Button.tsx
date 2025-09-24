import React from 'react';
import { type ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'full';

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  text: string | ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  style?: React.CSSProperties;
}

/* ----------- Spinner Loader ----------- */
const SpinnerLoader: React.FC<{
  size: ButtonSize;
  color: string;
}> = ({ size, color }) => {
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

/* ----------- Button Sizes ----------- */
const buttonSizes = {
  sm: 'px-4 py-2 text-sm font-medium min-h-[36px] gap-2',
  md: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2',
  lg: 'px-8 py-4 text-lg font-semibold min-h-[52px] gap-3',
  full: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2 w-full',
};

/* ----------- Variant Styles ----------- */
const getVariantStyles = (
  variant: ButtonVariant,
  selected: boolean = false,
) => {
  switch (variant) {
    case 'primary':
      if (selected) {
        return {
          base: 'bg-gradient-to-r from-ember-700 to-ember-800 text-ember-50 border-2 border-ember-400 shadow-lg',
          hover: 'hover:from-ember-600 hover:to-ember-700',
          active:
            'active:from-ember-800 active:to-ember-900 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
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
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
        loaderColor: '#141414',
      };
    case 'secondary':
      if (selected) {
        return {
          base: 'bg-ember-400 text-charcoal-900 border-2 border-ember-500 shadow-lg',
          hover: 'hover:bg-ember-300 hover:text-charcoal-900',
          active: 'active:bg-ember-500 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
          loaderColor: '#141414',
        };
      }
      return {
        base: 'bg-charcoal-600 text-ember-400 border border-ember-500/30',
        hover:
          'hover:bg-charcoal-500 hover:border-ember-400 hover:text-ember-300',
        active: 'active:bg-charcoal-700 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
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
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
          loaderColor: '#FF9142',
        };
      }
      return {
        base: 'bg-transparent text-charcoal-300 border border-transparent',
        hover:
          'hover:bg-charcoal-700/50 hover:text-ember-400 hover:border-ember-500/20',
        active: 'active:bg-charcoal-600/50 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
        loaderColor: '#888888',
      };
    case 'outline':
      if (selected) {
        return {
          base: 'bg-ember-500/15 text-ember-400 border-2 border-ember-500 shadow-lg',
          hover:
            'hover:bg-ember-500/25 hover:text-ember-300 hover:border-ember-400',
          active: 'active:bg-ember-500/35 active:scale-[0.98]',
          focus:
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-400 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
          loaderColor: '#FF9142',
        };
      }
      return {
        base: 'bg-transparent text-charcoal-300 border-2 border-charcoal-500',
        hover:
          'hover:bg-charcoal-700/30 hover:text-ember-400 hover:border-ember-500',
        active: 'active:bg-charcoal-600/40 active:scale-[0.98]',
        focus:
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 ',
        loaderColor: '#888888',
      };
    default:
      return getVariantStyles('primary', selected);
  }
};

/* ----------- Main Component ----------- */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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

        <span className={loading ? 'opacity-70' : ''}>{text}</span>

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

export default Button;
