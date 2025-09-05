import React from 'react';
import FormField from './FormField';
import type { FormField as FormFieldType } from '../hooks/useForm';

type FormGridProps = {
  fields: FormFieldType[];
  values: Record<string, any>;
  errors: Record<string, string>;
  onChange: (name: string, value: any) => void;
  columns?: 1 | 2;
};

const FormGrid: React.FC<FormGridProps> = ({
  fields,
  values,
  errors,
  onChange,
  columns = 1,
}) => {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
  }[columns];

  const colSpanClass = (span: number) =>
    ({
      1: 'col-span-1',
      2: 'col-span-2',
    }[span] || 'col-span-1');

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {fields.map((field) => (
        <div key={field.name} className={colSpanClass(field.colSpan || 1)}>
          <FormField
            field={field}
            value={values[field.name]}
            error={errors[field.name]}
            onChange={(value) => onChange(field.name, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default FormGrid;
