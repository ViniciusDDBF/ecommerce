import { useState } from 'react';
import { maskCNPJ } from '../utils/masks/cnpj';
import { maskPhone } from '../utils/masks/phone';
import { maskCPF } from '../utils/masks/cpf';
import { validateCPF } from '../utils/validation/validateCpf';
import { validateCNPJ } from '../utils/validation/validateCnpj';

type MaskType = 'phone' | 'cpf' | 'cnpj';

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
  applyMask?: MaskType;
  helper?: string;
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
    let maskedValue = value;

    // Find the field configuration for this name
    const field = fields.find((f) => f.name === name);

    // Apply mask based on field's applyMask property
    if (field?.applyMask === 'cpf') {
      maskedValue = maskCPF(value);
    } else if (field?.applyMask === 'cnpj') {
      maskedValue = maskCNPJ(value);
    } else if (field?.applyMask === 'phone') {
      maskedValue = maskPhone(value);
    }

    setValues((prev) => ({ ...prev, [name]: maskedValue }));

    const lowerName = name.toLowerCase();

    // Real-time validation
    if (lowerName.includes('cpf') || field?.applyMask === 'cpf') {
      const cleaned = maskedValue.replace(/\D/g, '');
      setErrors((prev) => ({
        ...prev,
        [name]:
          cleaned.length === 11 && !validateCPF(maskedValue)
            ? 'CPF inválido'
            : '',
      }));
    }

    if (lowerName.includes('cnpj') || field?.applyMask === 'cnpj') {
      const cleaned = maskedValue.replace(/\D/g, '');
      setErrors((prev) => ({
        ...prev,
        [name]:
          cleaned.length === 14 && !validateCNPJ(maskedValue)
            ? 'CNPJ inválido'
            : '',
      }));
    }

    // Clear other errors
    if (
      !lowerName.includes('cpf') &&
      !lowerName.includes('cnpj') &&
      field?.applyMask !== 'cpf' &&
      field?.applyMask !== 'cnpj'
    ) {
      if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];
      const lowerName = field.name.toLowerCase();

      // Required validation
      if (
        field.required &&
        (!value || (typeof value === 'string' && !value.trim()))
      ) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }

      // CPF validation (based on field name or applyMask)
      if (
        (lowerName.includes('cpf') || field.applyMask === 'cpf') &&
        value &&
        !validateCPF(value)
      ) {
        newErrors[field.name] = 'CPF inválido';
      }

      // CNPJ validation (based on field name or applyMask)
      if (
        (lowerName.includes('cnpj') || field.applyMask === 'cnpj') &&
        value &&
        !validateCNPJ(value)
      ) {
        newErrors[field.name] = 'CNPJ inválido';
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

export type { FormField, MaskType };
