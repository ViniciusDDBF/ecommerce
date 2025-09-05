import React, { useState, useEffect } from 'react';

type ButtonVariant = 'primary' | 'secondary';
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
  full: 'px-6 py-3 text-base font-semibold min-h-[44px] gap-2 w-full',
};

/* ---------------- Variant Styles with Selected States ---------------- */
const getVariantStyles = (
  variant: ButtonVariant,
  selected: boolean = false
) => {
  switch (variant) {
    case 'primary':
      if (selected) {
        return {
          base: 'bg-gradient-to-r from-ember-700 to-ember-800 text-ember-50 border-2 border-ember-400 shadow-lg',
          hover: 'hover:from-ember-600 hover:to-ember-700',
          active:
            'active:from-ember-800 active:to-ember-900 active:scale-[0.98]',
          focus: '',
          loaderColor: '#FFF8F0', // ember-50
          rippleColor: 'rgba(255, 248, 240, 0.5)', // ember-50 with opacity
        };
      }
      return {
        base: 'bg-gradient-to-r from-ember-500 to-ember-600 text-charcoal-900 border-0 shadow-md',
        hover:
          'hover:from-ember-400 hover:to-ember-500 hover:shadow-lg hover:text-charcoal-700',
        active:
          'active:from-ember-600 active:to-ember-700 active:scale-[0.98] active:text-charcoal-900',
        focus: '',
        loaderColor: '#141414', // charcoal-900
        rippleColor: 'rgba(20, 20, 20, 0.3)', // charcoal-900 with opacity
      };
    case 'secondary':
      if (selected) {
        return {
          base: 'bg-ember-400 text-charcoal-900 border-2 border-ember-500 shadow-lg',
          hover: 'hover:bg-ember-300 hover:text-charcoal-900',
          active: 'active:bg-ember-500 active:scale-[0.98]',
          focus: '',
          loaderColor: '#141414', // charcoal-900
          rippleColor: 'rgba(20, 20, 20, 0.3)', // charcoal-900 with opacity
        };
      }
      return {
        base: 'bg-charcoal-600 text-ember-400 border border-ember-500/30',
        hover:
          'hover:bg-charcoal-500 hover:border-ember-400 hover:text-ember-300',
        active: 'active:bg-charcoal-700 active:scale-[0.98]',
        focus: '',
        loaderColor: '#FF9142', // ember-400
        rippleColor: 'rgba(255, 145, 66, 0.5)', // ember-400 with opacity
      };
    default:
      return getVariantStyles('primary', selected);
  }
};

/* ---------------- Ripple Effect ---------------- */
interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

const RippleEffect: React.FC<{
  ripples: Ripple[];
  rippleColor: string;
}> = ({ ripples, rippleColor }) => (
  <div className="ripple-container">
    {ripples.map((ripple) => (
      <span
        key={ripple.key}
        className="ripple"
        style={{
          left: ripple.x,
          top: ripple.y,
          width: ripple.size,
          height: ripple.size,
          backgroundColor: rippleColor,
        }}
      />
    ))}
  </div>
);

/* ---------------- Main Component ---------------- */
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
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const variantStyles = getVariantStyles(variant, selected);
    const isDisabled = disabled || loading;
    const iconSize = size === 'sm' ? 16 : size === 'md' ? 18 : 20;

    const sizeClasses = buttonSizes[size];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      // Get button dimensions and click position
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      // Calculate click position relative to button
      const x = e.clientX - rect.left - radius;
      const y = e.clientY - rect.top - radius;

      // Create new ripple
      const newRipple: Ripple = {
        key: Date.now(),
        x,
        y,
        size: diameter,
      };

      setRipples((prev) => [...prev, newRipple]);

      // Call original onClick handler if provided
      onClick?.(e);
    };

    // Clean up ripples after animation
    useEffect(() => {
      if (ripples.length > 0) {
        const timeout = setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 1500); // Matches animation duration
        return () => clearTimeout(timeout);
      }
    }, [ripples]);

    const classes = [
      'inline-flex items-center justify-center rounded-lg transition ease-out select-none outline-none',
      // Required for ripple effect
      'relative overflow-hidden',
      sizeClasses,
      variantStyles.base,
      !isDisabled ? variantStyles.hover : '',
      !isDisabled ? variantStyles.active : '',
      variantStyles.focus,
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
        onClick={handleClick}
        {...props}
      >
        {/* Ripple Effect */}
        <RippleEffect
          ripples={ripples}
          rippleColor={variantStyles.rippleColor}
        />

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
          className={`flex items-center justify-center relative z-10 ${
            loading ? 'opacity-70' : ''
          }`}
        >
          {text}
        </span>

        {/* End Icon (hidden during loading) */}
        {!loading && endIcon && (
          <span className="flex items-center justify-center flex-shrink-0 relative z-10">
            {endIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
