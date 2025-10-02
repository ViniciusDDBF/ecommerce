import React, { type ReactNode } from 'react';

type ButtonVariant = 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  text?: string | ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  selected?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  style?: React.CSSProperties;
}

export const Link: React.FC<LinkProps> = ({
  text,
  variant = 'text',
  size = 'md',
  selected = false,
  disabled = false,
  startIcon,
  endIcon,
  className = '',
  style,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
  }[size];

  const baseClasses = `inline-flex items-center font-medium ${sizeClasses} transition`;

  const variantClasses = `text-ember-400 hover:text-ember-300   ${selected ? 'text-ember-500 font-semibold underline decoration-2 underline-offset-5' : ''}`;

  const disabledClasses = disabled
    ? 'opacity-50 cursor-not-allowed pointer-events-none'
    : '';

  const combinedClasses =
    `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`.trim();

  return (
    <a
      {...props}
      className={combinedClasses}
      style={style}
      aria-disabled={disabled ? 'true' : undefined}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {text}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </a>
  );
};
