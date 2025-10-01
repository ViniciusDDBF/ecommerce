import React from 'react';
import type { FormFieldProps as FormFieldType } from '../../../types/hooks';
import CustomSelect from '../../atoms/CustomSelect';
import Helper from '../../atoms/Helper';
import { CustomCheckbox } from '../../atoms/CustomCheckbox';

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
  const baseClasses = `w-full px-4 py-3 bg-charcoal-800 border rounded-lg text-ember-50 placeholder-charcoal-400 focus:outline-none focus:ring-2 focus:ring-ember-500 focus:border-transparent transition-colors disabled:bg-charcoal-700 disabled:text-charcoal-400 disabled:border-charcoal-600 disabled:cursor-not-allowed ${
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
            disabled={field.disabled}
          />
        );

      case 'select':
        return (
          <CustomSelect
            options={field.options}
            onChange={onChange}
            value={value || ''}
            placeholder={field.placeholder}
          />
        );

      case 'checkbox':
        return (
          <CustomCheckbox
            label={field.label}
            checked={value || false}
            onChange={onChange}
          />
        );

      default:
        return (
          <input
            disabled={field.disabled}
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
    <div className={`relative space-y-2 ${field.className || ''}`}>
      {field.type !== 'checkbox' && (
        <label className="text-charcoal-200 flex items-center justify-between gap-2 text-sm font-medium">
          <div>
            {field.label}
            {field.validation?.required && (
              <span className="ml-1 text-red-400">*</span>
            )}
          </div>

          {field.helper && (
            <Helper
              onClick={() => {
                onChange(field.helper!.value);
              }}
              value={field.helper.value}
              tooltip={field.helper.text}
            />
          )}
        </label>
      )}

      {renderInput()}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default FormField;
