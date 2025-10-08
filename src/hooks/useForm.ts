import type { useFormParams, useFormReturn } from '@/types';
import { useCallback, useState } from 'react';
import {
  maskCNPJ,
  maskCPF,
  maskPhone,
  validateCNPJ,
  validateCPF,
} from '@/utils';

export const useForm = ({
  fields,
  initialValues = {},
}: useFormParams): useFormReturn => {
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

  const setValue = useCallback(
    (name: string, value: unknown) => {
      const field = fields.find((f) => f.name === name);

      setValues((prev) => {
        const updated = { ...prev, [name]: value };
        return updated;
      });

      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        // Handle checkbox separately
        if (field?.type === 'checkbox') {
          newErrors[name] = '';
          return newErrors;
        }

        if (typeof value !== 'string') {
          newErrors[name] = 'Invalid input';
          return newErrors;
        }

        let maskedValue = value;
        if (field?.applyMask === 'cpf') maskedValue = maskCPF(value);
        if (field?.applyMask === 'cnpj') maskedValue = maskCNPJ(value);
        if (field?.applyMask === 'phone') maskedValue = maskPhone(value);

        // Example CPF validation
        if (field?.applyMask === 'cpf') {
          const cleaned = maskedValue.replace(/\D/g, '');
          newErrors[name] =
            cleaned.length === 11 && !validateCPF(maskedValue)
              ? 'Invalid CPF'
              : cleaned.length > 0 && cleaned.length !== 11
                ? 'CPF must have 11 digits'
                : '';
        }

        return newErrors;
      });
    },
    [fields], // no errors or values in dependencies anymore
  );

  const setValuesAll = useCallback(
    (newValues: Record<string, unknown>, replace = false) => {
      setValues((prev) => {
        // if replace=true, wipe everything first
        const updated = replace ? {} : { ...prev };

        // ensure fields exist in definition
        fields.forEach((field) => {
          if (field.name in newValues) {
            updated[field.name] =
              field.type === 'checkbox'
                ? !!newValues[field.name]
                : newValues[field.name];
          }
        });

        return updated;
      });

      // clear errors for all updated fields
      setErrors((prev) => {
        const cleared = { ...prev };
        Object.keys(newValues).forEach((name) => {
          cleared[name] = '';
        });
        return cleared;
      });
    },
    [fields],
  );

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];

      // Handle checkbox required validation
      if (field.type === 'checkbox' && field.validation?.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (
        field.validation?.required &&
        (!value || (typeof value === 'string' && !value.trim()))
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (
        field.validation?.minLength &&
        typeof value === 'string' &&
        value.length < field.validation.minLength
      ) {
        newErrors[field.name] =
          `${field.label} must have at least ${field.validation.minLength} characters`;
      }
      if (
        field.validation?.maxLength &&
        typeof value === 'string' &&
        value.length > field.validation.maxLength
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (field.applyMask === 'cpf' && value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 11) {
          newErrors[field.name] = 'CPF must have 11 digits';
        } else if (!validateCPF(value)) {
          newErrors[field.name] = 'Invalid CPF';
        }
      }

      if (field.applyMask === 'cnpj' && value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length !== 14) {
          newErrors[field.name] = 'CNPJ must have 14 digits';
        } else if (!validateCNPJ(value)) {
          newErrors[field.name] = 'Invalid CNPJ';
        }
      }

      if (field.applyMask === 'phone' && value) {
        const cleaned = value.replace(/\D/g, '');
        if (cleaned.length < 10) {
          newErrors[field.name] = 'Phone must have at least 10 digits';
        }
      }

      if (field.confirmField && value) {
        const confirmValue = values[field.confirmField];
        if (value !== confirmValue) {
          newErrors[field.name] = 'Passwords do not match';
        }
      }

      if (
        field.type === 'email' &&
        value &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      ) {
        newErrors[field.name] = 'Please, provide a valid email';
      }

      if (field.validation?.custom && value) {
        const error = field.validation.custom(value);
        if (error) newErrors[field.name] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [fields, values]);

  const reset = useCallback(() => {
    const defaultValues: Record<string, unknown> = {};
    fields.forEach((field) => {
      defaultValues[field.name] = field.type === 'checkbox' ? false : '';
    });
    setValues(defaultValues);
    setErrors({});
    setIsSubmitting(false);
  }, [fields]);

  const resetToInitial = useCallback(() => {
    setValues({ ...initialValues });
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    setValue,
    setValuesAll,
    validate,
    reset,
    resetToInitial,
  };
};
