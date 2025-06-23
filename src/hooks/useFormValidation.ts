import { useState, useCallback, useMemo } from 'react';

// Validation rule types
export type ValidationRule<T = any> = {
  required?: boolean | string;
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  email?: boolean | string;
  custom?: (value: T) => string | boolean;
};

export type ValidationRules<T> = {
  [K in keyof T]?: ValidationRule<T[K]>;
};

export type FormErrors<T> = {
  [K in keyof T]?: string;
};

export type TouchedFields<T> = {
  [K in keyof T]?: boolean;
};

interface UseFormValidationOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules<T>;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
  onSubmit?: (values: T) => void | Promise<void>;
}

interface UseFormValidationReturn<T> {
  values: T;
  errors: FormErrors<T>;
  touched: TouchedFields<T>;
  isValid: boolean;
  isSubmitting: boolean;
  setValue: (field: keyof T, value: T[keyof T]) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  setErrors: (errors: FormErrors<T>) => void;
  clearError: (field: keyof T) => void;
  clearErrors: () => void;
  setTouched: (field: keyof T, touched?: boolean) => void;
  validateField: (field: keyof T) => string | null;
  validateForm: () => boolean;
  handleChange: (field: keyof T) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleBlur: (field: keyof T) => (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (event?: React.FormEvent) => Promise<void>;
  reset: () => void;
}

// Built-in validation functions
const validateRequired = (value: any, message?: string): string | null => {
  if (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0)) {
    return message || 'This field is required';
  }
  return null;
};

const validateMinLength = (value: string, min: number, message?: string): string | null => {
  if (value && value.length < min) {
    return message || `Minimum length is ${min} characters`;
  }
  return null;
};

const validateMaxLength = (value: string, max: number, message?: string): string | null => {
  if (value && value.length > max) {
    return message || `Maximum length is ${max} characters`;
  }
  return null;
};

const validateMin = (value: number, min: number, message?: string): string | null => {
  if (value !== null && value !== undefined && value < min) {
    return message || `Minimum value is ${min}`;
  }
  return null;
};

const validateMax = (value: number, max: number, message?: string): string | null => {
  if (value !== null && value !== undefined && value > max) {
    return message || `Maximum value is ${max}`;
  }
  return null;
};

const validatePattern = (value: string, pattern: RegExp, message?: string): string | null => {
  if (value && !pattern.test(value)) {
    return message || 'Invalid format';
  }
  return null;
};

const validateEmail = (value: string, message?: string): string | null => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value && !emailPattern.test(value)) {
    return message || 'Invalid email address';
  }
  return null;
};

/**
 * Custom hook for form validation and state management
 * @param options - Configuration options for the form
 * @returns Object containing form state and utility functions
 */
export function useFormValidation<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  validateOnChange = false,
  validateOnBlur = true,
  onSubmit,
}: UseFormValidationOptions<T>): UseFormValidationReturn<T> {
  const [values, setValuesState] = useState<T>(initialValues);
  const [errors, setErrorsState] = useState<FormErrors<T>>({});
  const [touched, setTouchedState] = useState<TouchedFields<T>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate a single field
  const validateField = useCallback((field: keyof T): string | null => {
    const value = values[field];
    const rules = validationRules[field];

    if (!rules) return null;

    // Required validation
    if (rules.required) {
      const message = typeof rules.required === 'string' ? rules.required : undefined;
      const error = validateRequired(value, message);
      if (error) return error;
    }

    // Skip other validations if field is empty and not required
    if (!value && value !== 0) return null;

    // String validations
    if (typeof value === 'string') {
      // Min length validation
      if (rules.minLength) {
        const config = typeof rules.minLength === 'number' 
          ? { value: rules.minLength } 
          : rules.minLength;
        const error = validateMinLength(value, config.value, config.message);
        if (error) return error;
      }

      // Max length validation
      if (rules.maxLength) {
        const config = typeof rules.maxLength === 'number' 
          ? { value: rules.maxLength } 
          : rules.maxLength;
        const error = validateMaxLength(value, config.value, config.message);
        if (error) return error;
      }

      // Pattern validation
      if (rules.pattern) {
        const config = rules.pattern instanceof RegExp 
          ? { value: rules.pattern } 
          : rules.pattern;
        const error = validatePattern(value, config.value, config.message);
        if (error) return error;
      }

      // Email validation
      if (rules.email) {
        const message = typeof rules.email === 'string' ? rules.email : undefined;
        const error = validateEmail(value, message);
        if (error) return error;
      }
    }

    // Number validations
    if (typeof value === 'number') {
      // Min value validation
      if (rules.min) {
        const config = typeof rules.min === 'number' 
          ? { value: rules.min } 
          : rules.min;
        const error = validateMin(value, config.value, config.message);
        if (error) return error;
      }

      // Max value validation
      if (rules.max) {
        const config = typeof rules.max === 'number' 
          ? { value: rules.max } 
          : rules.max;
        const error = validateMax(value, config.value, config.message);
        if (error) return error;
      }
    }

    // Custom validation
    if (rules.custom) {
      const result = rules.custom(value);
      if (typeof result === 'string') return result;
      if (result === false) return 'Invalid value';
    }

    return null;
  }, [values, validationRules]);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors<T> = {};
    let isFormValid = true;

    Object.keys(validationRules).forEach((field) => {
      const error = validateField(field as keyof T);
      if (error) {
        newErrors[field as keyof T] = error;
        isFormValid = false;
      }
    });

    setErrorsState(newErrors);
    return isFormValid;
  }, [validateField, validationRules]);

  // Check if form is valid
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Set single field value
  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValuesState(prev => ({ ...prev, [field]: value }));

    if (validateOnChange) {
      const error = validateField(field);
      setErrorsState(prev => ({
        ...prev,
        [field]: error || undefined,
      }));
    }
  }, [validateField, validateOnChange]);

  // Set multiple field values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  // Set single field error
  const setError = useCallback((field: keyof T, error: string) => {
    setErrorsState(prev => ({ ...prev, [field]: error }));
  }, []);

  // Set multiple field errors
  const setErrors = useCallback((newErrors: FormErrors<T>) => {
    setErrorsState(newErrors);
  }, []);

  // Clear single field error
  const clearError = useCallback((field: keyof T) => {
    setErrorsState(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearErrors = useCallback(() => {
    setErrorsState({});
  }, []);

  // Set field as touched
  const setTouched = useCallback((field: keyof T, isTouched = true) => {
    setTouchedState(prev => ({ ...prev, [field]: isTouched }));
  }, []);

  // Handle input change
  const handleChange = useCallback((field: keyof T) => {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { value, type, checked } = event.target as HTMLInputElement;
      const fieldValue = type === 'checkbox' ? checked : value;
      setValue(field, fieldValue as T[keyof T]);
    };
  }, [setValue]);

  // Handle input blur
  const handleBlur = useCallback((field: keyof T) => {
    return (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setTouched(field, true);

      if (validateOnBlur) {
        const error = validateField(field);
        setErrorsState(prev => ({
          ...prev,
          [field]: error || undefined,
        }));
      }
    };
  }, [validateField, validateOnBlur, setTouched]);

  // Handle form submission
  const handleSubmit = useCallback(async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(initialValues).reduce((acc, key) => {
      acc[key as keyof T] = true;
      return acc;
    }, {} as TouchedFields<T>);
    setTouchedState(allTouched);

    // Validate form
    const isFormValid = validateForm();

    if (isFormValid && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [initialValues, validateForm, onSubmit, values]);

  // Reset form to initial state
  const reset = useCallback(() => {
    setValuesState(initialValues);
    setErrorsState({});
    setTouchedState({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isValid,
    isSubmitting,
    setValue,
    setValues,
    setError,
    setErrors,
    clearError,
    clearErrors,
    setTouched,
    validateField,
    validateForm,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
  };
}

export default useFormValidation;