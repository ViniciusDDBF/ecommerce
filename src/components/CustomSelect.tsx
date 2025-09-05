import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

export interface SelectOption {
  value: string;
  label: string;
}

export interface CustomSelectProps {
  options?: SelectOption[];
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options = [],
  placeholder = 'Select...',
  value = '',
  onChange = () => {},
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  useClickOutside(selectRef, () => setIsOpen(false));

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={`relative w-full ${className}`} ref={selectRef}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
    w-full px-4 py-3 bg-charcoal-800 border rounded-lg 
    text-ember-50 placeholder-charcoal-400 
    focus:outline-none focus:ring-2 focus:ring-ember-500 
    focus:border-transparent transition-colors 
    border-charcoal-600 hover:border-charcoal-500
    flex items-center justify-between text-left
  "
      >
        {/* Selected Value or Placeholder */}
        <span
          className={`block text-sm font-medium truncate ${
            !selectedOption ? 'text-charcoal-400' : ''
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Chevron Icon */}
        <ChevronDown
          className={`
      w-5 h-5 ml-2
      transition-all duration-300 ease-out
      ${isOpen ? 'rotate-180' : 'rotate-0'}
      text-charcoal-400
    `}
        />
      </button>

      {/* Options Dropdown */}
      <div
        className={`
    absolute z-50 w-full mt-1 border-2 
    rounded-xl shadow-2xl max-h-64 overflow-auto
    bg-charcoal-800 border-charcoal-600
    transform transition-all duration-200 ease-out
    ${
      isOpen
        ? 'opacity-100 scale-100 translate-y-0'
        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
    }
  `}
      >
        {options.map((option, index) => (
          <div
            key={option.value || index}
            onClick={() => handleSelect(option)}
            className={`
        px-4 py-3 cursor-pointer transition-all duration-200
        flex items-center gap-2 font-medium
        last:rounded-b-lg 
        ${
          selectedValue === option.value
            ? 'bg-charcoal-800 text-ember-300 hover:bg-charcoal-700'
            : 'text-charcoal-200 hover:bg-charcoal-700'
        }
      `}
          >
            {selectedValue === option.value && (
              <Check className="w-4 h-4 opacity-80 shrink-0" />
            )}
            <span className="text-sm truncate">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
