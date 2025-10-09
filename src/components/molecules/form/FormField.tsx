import type { FormFieldProps } from '@/types';
import {
  CustomCheckbox,
  CustomSelect,
  Helper,
  Input,
} from '@/components/atoms';

export const FormField = <T extends string | number | boolean>({
  field,
  value,
  error,
  onChange,
}: FormFieldProps<T>) => {
  const renderInput = () => {
    switch (field.type) {
      case 'textarea':
        return (
          <Input
            disabled={field.disabled}
            error={!!error}
            onChange={(val: string) => onChange(val as T)}
            placeholder={field.placeholder}
            type="textarea"
            value={(value as string) || ''}
          />
        );

      case 'select':
        return (
          <CustomSelect
            onChange={(val: string) => onChange(val as T)}
            options={field.options}
            placeholder={field.placeholder}
            value={(value as string) || ''}
          />
        );

      case 'checkbox':
        return (
          <CustomCheckbox
            checked={Boolean(value)}
            label={field.label}
            onChange={(val: boolean) => onChange(val as T)}
          />
        );

      default:
        return (
          <Input
            disabled={field.disabled}
            error={!!error}
            onChange={(val: string) => onChange(val as T)}
            placeholder={field.placeholder}
            type="text"
            value={(value as string) || ''}
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
              onClick={() => onChange(field.helper?.value as T)}
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
