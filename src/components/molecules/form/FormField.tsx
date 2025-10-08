import type { FC, FormFieldProps } from '@/types';
import {
  CustomCheckbox,
  CustomSelect,
  Helper,
  Input,
} from '@/components/atoms';

export const FormField: FC<FormFieldProps> = ({
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
            disabled={field.disabled}
            error={!!error}
            onChange={onChange}
            placeholder={field.placeholder}
            type="textarea"
            value={value || ''}
          />
        );

      case 'select':
        return (
          <CustomSelect
            onChange={onChange}
            options={field.options}
            placeholder={field.placeholder}
            value={value || ''}
          />
        );

      case 'checkbox':
        return (
          <CustomCheckbox
            checked={value || false}
            label={field.label}
            onChange={onChange}
          />
        );

      default:
        return (
          <Input
            disabled={field.disabled}
            error={!!error}
            onChange={onChange}
            placeholder={field.placeholder}
            type={'text'}
            value={value || ''}
          />
        );
    }
  };

  return (
    <div className={`relative space-y-2 ${field.className || ''}`}>
      {field.type !== 'checkbox' && (
        <span className="text-charcoal-200 flex items-center justify-between gap-2 text-sm font-medium">
          <div>
            {field.label}
            {field.validation?.required && (
              <span className="ml-1 text-red-400">*</span>
            )}
          </div>

          {field.helper && (
            <Helper
              onClick={() => {
                onChange(field.helper?.value);
              }}
              tooltip={field.helper.text}
              value={field.helper.value}
            />
          )}
        </span>
      )}

      {renderInput()}

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};
