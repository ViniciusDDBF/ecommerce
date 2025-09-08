import React from 'react';
import type { FormField as FormFieldType } from '../hooks/useForm';
import CustomSelect from './CustomSelect';
import Helper from './Helper';

type FormFieldProps = {
  field: FormFieldType;
  value: any;
  error?: string;
  onChange: (value: any) => void;
};

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
}) => {
  const baseClasses = `w-full px-4 py-3 bg-charcoal-800 border rounded-lg text-ember-50 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-transparent transition-colors ${
    error ? 'border-red-500' : 'border-charcoal-600 hover:border-charcoal-500'
  }`;

  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={`${baseClasses} resize-none`}
            rows={4}
          />
        );

      case 'select':
        return (
          <CustomSelect
            label={field.label}
            options={field.options}
            onChange={onChange}
            value={value || ''}
            placeholder={field.placeholder}
          />
        );

      case 'checkbox':
        return (
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center">
              <label
                className="relative flex cursor-pointer items-center rounded-full p-3"
                htmlFor="ripple-on"
                data-ripple-dark="true"
              >
                <input
                  id="ripple-on"
                  checked={value || false}
                  onChange={(e) => onChange(e.target.checked)}
                  type="checkbox"
                  className="peer relative h-5 w-5 cursor-pointer appearance-none rounded border border-ember-300 shadow hover:shadow-md transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-ember-400 before:opacity-0 before:transition-opacity checked:border-ember-800 checked:bg-ember-800 checked:before:bg-ember-400 hover:before:opacity-10"
                />
                <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
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
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                className="cursor-pointer text-ember-50 text-sm"
                htmlFor="ripple-on"
              >
                {field.label}
              </label>
            </div>
          </div>
        );

      default:
        return (
          <input
            type={field.type}
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 relative ${field.className || ''}`}>
      {field.type !== 'checkbox' && (
        <label className="text-sm font-medium text-charcoal-200 flex items-center gap-2 justify-between">
          <div>
            {field.label}
            {field.required && <span className="text-red-400 ml-1">*</span>}
          </div>

          {/* Render helper if field.helper exists */}
          {field.helper && <Helper tooltip={field.helper} />}
        </label>
      )}

      {renderInput()}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FormField;
