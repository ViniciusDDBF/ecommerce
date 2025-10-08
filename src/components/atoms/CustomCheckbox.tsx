import type { CustomCheckboxProps, FC } from '@/types';
import { useId } from 'react';

export const CustomCheckbox: FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  const inputId = useId();
  const titleId = useId();

  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          data-ripple-dark="true"
          htmlFor={inputId}
        >
          <input
            checked={checked}
            className="peer border-ember-300 before:bg-ember-400 checked:border-ember-800 checked:bg-ember-800 checked:before:bg-ember-400 relative h-5 w-5 cursor-pointer appearance-none rounded border shadow transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:shadow-md hover:before:opacity-10"
            id={inputId}
            onChange={(e) => onChange(e.target.checked)}
            type="checkbox"
          />
          <span className="text-charcoal-50 pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              aria-labelledby={titleId}
              className="h-3.5 w-3.5"
              fill="currentColor"
              role="img"
              stroke="currentColor"
              strokeWidth="1"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title id={titleId}>{label}</title>
              <path
                clipRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                fillRule="evenodd"
              />
            </svg>
          </span>
        </label>
        <label
          className="text-ember-50 cursor-pointer text-sm"
          htmlFor={inputId}
        >
          {label}
        </label>
      </div>
    </div>
  );
};
