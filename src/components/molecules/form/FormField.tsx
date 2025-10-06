import type { FormFieldProps } from '../../../types';
import React from 'react';
import { CustomCheckbox, Input, Helper, CustomSelect } from '../../atoms/';

export const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
}) => {
  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Input
            type="textarea"
            value={value || ''}
            onChange={onChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            error={!!error}
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
          <Input
            type={'text'}
            value={value || ''}
            onChange={onChange}
            placeholder={field.placeholder}
            disabled={field.disabled}
            error={!!error}
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
