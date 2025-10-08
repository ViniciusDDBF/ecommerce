import type { FC, FormGridProps } from '@/types';
import { FormField } from '@/components/molecules';

export const FormGrid: FC<FormGridProps> = ({
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
    })[span] || 'col-span-1';

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {fields.map((field) => (
        <div key={field.name} className={colSpanClass(field.colSpan || 1)}>
          <FormField
            error={errors[field.name]}
            field={field}
            onChange={(value) => onChange(field.name, value)}
            value={values[field.name]}
          />
        </div>
      ))}
    </div>
  );
};
