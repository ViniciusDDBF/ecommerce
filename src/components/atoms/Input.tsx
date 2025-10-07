import type { InputProps, FC  } from '../../types';

export const Input: FC<InputProps> = ({
  type = 'text',
  value,
  onChange,
  placeholder,
  disabled = false,
  error = false,
  className = '',
}) => {
  const baseClasses = `w-full px-4 py-3 bg-charcoal-800 border rounded-lg text-ember-50 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-transparent transition-colors disabled:bg-charcoal-700 disabled:text-charcoal-400 disabled:border-charcoal-600 disabled:cursor-not-allowed ${
    error ? 'border-red-500' : 'border-charcoal-600 hover:border-charcoal-500'
  } ${className}`;

  if (type === 'textarea') {
    return (
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${baseClasses} resize-none`}
        disabled={disabled}
      />
    );
  }

  return (
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={baseClasses}
      disabled={disabled}
    />
  );
};
