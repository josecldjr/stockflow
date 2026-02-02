import React, { useState, useEffect } from 'react';
import { Input, InputProps } from './Input';

export interface CNPJInputProps extends Omit<InputProps, 'value' | 'onChange' | 'type' | 'maxLength'> {
  value?: string;
  onChange?: (value: string) => void;
}

const formatCNPJ = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 2) return cleaned;
  if (cleaned.length <= 5) return `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
  if (cleaned.length <= 8) return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
  if (cleaned.length <= 12)
    return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
  return `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
};

const validateCNPJ = (cnpj: string): boolean => {
  const cleaned = cnpj.replace(/\D/g, '');
  if (cleaned.length !== 14) return false;

  // Check for known invalid patterns
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let length = cleaned.length - 2;
  let numbers = cleaned.substring(0, length);
  const digits = cleaned.substring(length);
  let sum = 0;
  let pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = cleaned.substring(0, length);
  sum = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    sum += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export const CNPJInput = React.forwardRef<HTMLInputElement, CNPJInputProps>(
  ({ value = '', onChange, onBlur, error: externalError, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');
    const [error, setError] = useState<string | undefined>(externalError);

    useEffect(() => {
      if (value) {
        setDisplayValue(formatCNPJ(value));
      } else {
        setDisplayValue('');
      }
    }, [value]);

    useEffect(() => {
      setError(externalError);
    }, [externalError]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const cleaned = inputValue.replace(/\D/g, '');
      
      if (cleaned.length <= 14) {
        const formatted = formatCNPJ(cleaned);
        setDisplayValue(formatted);
        onChange?.(cleaned);
        setError(undefined);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const cleaned = displayValue.replace(/\D/g, '');
      if (cleaned.length === 14 && !validateCNPJ(cleaned)) {
        setError('Invalid CNPJ');
      } else if (cleaned.length > 0 && cleaned.length < 14) {
        setError('CNPJ must have 14 digits');
      }
      onBlur?.(e);
    };

    return (
      <Input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={18}
        placeholder="00.000.000/0000-00"
        error={error}
        {...props}
      />
    );
  }
);

CNPJInput.displayName = 'CNPJInput';


