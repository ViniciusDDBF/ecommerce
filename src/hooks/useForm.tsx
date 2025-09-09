import { useState } from 'react';
import { maskCNPJ } from '../utils/masks/cnpj';
import { maskPhone } from '../utils/masks/phone';
import { maskCPF } from '../utils/masks/cpf';
import { validateCPF } from '../utils/validation/validateCpf';
import { validateCNPJ } from '../utils/validation/validateCnpj';

type MaskType = 'phone' | 'cpf' | 'cnpj';

interface Validation {
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  custom?: (value: any) => string | null;
}

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'checkbox';
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: Validation;
  colSpan?: 1 | 2;
  className?: string;
  applyMask?: MaskType;
  helper?: { text: string; value?: string };
  confirmField?: string;
}

export const useForm = (
  fields: FormField[],
  initialValues: Record<string, any> = {},
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
    if (typeof value !== 'string') {
      setValues((prev) => ({ ...prev, [name]: '' }));
      setErrors((prev) => ({ ...prev, [name]: 'Invalid input' }));
      return;
    }

    let maskedValue = value;
    const field = fields.find((f) => f.name === name);

    if (field?.applyMask === 'cpf') {
      maskedValue = maskCPF(value);
    } else if (field?.applyMask === 'cnpj') {
      maskedValue = maskCNPJ(value);
    } else if (field?.applyMask === 'phone') {
      maskedValue = maskPhone(value);
    }

    setValues((prev) => ({ ...prev, [name]: maskedValue }));

    const newErrors: Record<string, string> = { ...errors };

    if (field?.applyMask === 'cpf') {
      const cleaned = maskedValue.replace(/\D/g, '');
      newErrors[name] =
        cleaned.length === 11 && !validateCPF(maskedValue)
          ? 'Invalid CPF'
          : cleaned.length > 0 && cleaned.length !== 11
            ? 'CPF must have 11 digits'
            : '';
    }

    if (field?.applyMask === 'cnpj') {
      const cleaned = maskedValue.replace(/\D/g, '');
      newErrors[name] =
        cleaned.length === 14 && !validateCNPJ(maskedValue)
          ? 'Invalid CNPJ'
          : cleaned.length > 0 && cleaned.length !== 14
            ? 'CNPJ must have 14 digits'
            : '';
    }

    if (field?.applyMask === 'phone') {
      const cleaned = maskedValue.replace(/\D/g, '');
      newErrors[name] =
        cleaned.length > 0 && cleaned.length < 10
          ? 'Phone must have at least 10 digits'
          : '';
    }

    if (field?.confirmField) {
      const confirmValue = values[field.confirmField];
      newErrors[name] =
        maskedValue && confirmValue && maskedValue !== confirmValue
          ? 'Passwords do not match'
          : '';
    }

    if (field?.validation) {
      const { minLength, maxLength, required, custom } = field.validation;
      if (
        required &&
        (!maskedValue ||
          (typeof maskedValue === 'string' && !maskedValue.trim()))
      ) {
        newErrors[name] = `${field.label} is required`;
      } else if (minLength && maskedValue.length < minLength) {
        newErrors[name] =
          `${field.label} must have at least ${minLength} characters`;
      } else if (maxLength && maskedValue.length > maxLength) {
        newErrors[name] =
          `${field.label} must have at most ${maxLength} characters`;
      } else if (custom) {
        const customError = custom(maskedValue);
        if (customError) newErrors[name] = customError;
      } else if (newErrors[name]) {
        newErrors[name] = '';
      }
    }

    setErrors(newErrors);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];

      if (
        field.validation?.required &&
        (!value || (typeof value === 'string' && !value.trim()))
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      if (
        field.validation?.minLength &&
        value &&
        value.length < field.validation.minLength
      ) {
        newErrors[field.name] =
          `${field.label} must have at least ${field.validation.minLength} characters`;
      }
      if (
        field.validation?.maxLength &&
        value &&
        value.length > field.validation.maxLength
      ) {
        newErrors[field.name] =
          `${field.label} must have at most ${field.validation.maxLength} characters`;
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

export type { FormField, MaskType, Validation };
