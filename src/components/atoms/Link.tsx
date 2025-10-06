import React from 'react';
import type { LinkProps } from '../../types';

export const Link: React.FC<LinkProps> = ({
  text,
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
    xs: 'text-xs px-1.5 py-0.5',
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-1.5',
    lg: 'text-lg px-4 py-2',
    xl: 'text-xl px-5 py-2.5',
  }[size];

  const baseClasses = `inline-flex items-center font-medium ${sizeClasses} transition`;

  const variantClasses = `text-charcoal-200 hover:text-ember-300 ${
    selected
      ? 'text-ember-500 font-semibold underline decoration-2 underline-offset-5'
      : ''
  }`;

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
