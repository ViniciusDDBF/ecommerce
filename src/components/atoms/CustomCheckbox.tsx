import type { CustomCheckboxProps } from '../../types';

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  label,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="inline-flex items-center">
        <label
          className="relative flex cursor-pointer items-center rounded-full p-3"
          htmlFor={label}
          data-ripple-dark="true"
        >
          <input
            id={label}
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="peer border-ember-300 before:bg-ember-400 checked:border-ember-800 checked:bg-ember-800 checked:before:bg-ember-400 relative h-5 w-5 cursor-pointer appearance-none rounded border shadow transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:shadow-md hover:before:opacity-10"
          />
          <span className="text-charcoal-50 pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </label>
        <label className="text-ember-50 cursor-pointer text-sm" htmlFor={label}>
          {label}
        </label>
      </div>
    </div>
  );
};
