import { useState } from 'react';

type FormField = {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  validation?: (value: any) => string | null;
  colSpan?: 1 | 2 | 3 | 4;
  className?: string;
};

export const useForm = (
  fields: FormField[],
  initialValues: Record<string, any> = {}
) => {
  const [values, setValues] = useState(() => {
    const defaultValues = { ...initialValues };
    fields.forEach((field) => {
      if (!(field.name in defaultValues)) {
        defaultValues[field.name] = field.type === 'checkbox' ? false : '';
      }
    });
    return defaultValues;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];

      // Required validation
      if (
        field.required &&
        (!value || (typeof value === 'string' && !value.trim()))
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // Custom validation
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) newErrors[field.name] = error;
      }

      // Email validation
      if (
        field.type === 'email' &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.name] = 'Please enter a valid email address';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    const defaultValues: Record<string, any> = {};
    fields.forEach((field) => {
      defaultValues[field.name] = field.type === 'checkbox' ? false : '';
    });
    setValues(defaultValues);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    setValue,
    validate,
    reset,
  };
};

export type { FormField };
