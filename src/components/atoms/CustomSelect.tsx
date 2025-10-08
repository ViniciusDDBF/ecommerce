import type { CustomSelectProps, FC, ISelectOption } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import { useClickOutside } from '@/hooks/';

export const CustomSelect: FC<CustomSelectProps> = ({
  options = [],
  placeholder = 'Select...',
  value = '',
  onChange = () => {},
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside({ ref: selectRef, callback: () => setIsOpen(false) });

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option: ISelectOption) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div ref={selectRef} className={`relative w-full ${className}`}>
      {/* ---------- Select Button ---------- */}
      <button
        className="bg-charcoal-800 text-ember-50 placeholder-charcoal-400 focus:ring-ember-500 border-charcoal-600 hover:border-charcoal-500 flex w-full cursor-pointer items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors focus:border-transparent focus:ring-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        {/* ---------- Selected Value or Placeholder ---------- */}
        <span
          className={`block truncate text-sm font-medium ${
            !selectedOption ? 'text-charcoal-400' : ''
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* ---------- Chevron Icon ---------- */}
        <ChevronDown
          className={`ml-2 h-5 w-5 transition-all duration-300 ease-out ${isOpen ? 'rotate-180' : 'rotate-0'} text-charcoal-400`}
        />
      </button>

      {/* ---------- Options Dropdown ---------- */}
      <div
        className={`bg-charcoal-800 border-charcoal-600 absolute z-50 mt-1 max-h-64 w-full transform overflow-auto rounded-xl border-2 shadow-2xl transition-all duration-200 ease-out ${
          isOpen
            ? 'translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none -translate-y-2 scale-95 opacity-0'
        } `}
      >
        {options.map((option) => (
          <button
            key={option.value}
            className={`flex w-full cursor-pointer items-center gap-2 px-4 py-3 font-medium transition-all duration-200 last:rounded-b-lg ${
              selectedValue === option.value
                ? 'bg-charcoal-800 text-ember-300 hover:bg-charcoal-700'
                : 'text-charcoal-200 hover:bg-charcoal-700'
            }`}
            onClick={() => handleSelect(option)}
            type="button"
          >
            {selectedValue === option.value && (
              <Check className="h-4 w-4 shrink-0 opacity-80" />
            )}
            <span className="truncate text-sm">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
