import React, { useState, useEffect } from 'react';
import { Input, InputProps } from './Input';

export interface CPFInputProps extends Omit<InputProps, 'value' | 'onChange' | 'type' | 'maxLength'> {
  value?: string;
  onChange?: (value: string) => void;
}

const formatCPF = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 3) return cleaned;
  if (cleaned.length <= 6) return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  if (cleaned.length <= 9)
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
};

const validateCPF = (cpf: string): boolean => {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;

  // Check for known invalid patterns
  if (/^(\d)\1+$/.test(cleaned)) return false;

  let sum = 0;
  let remainder: number;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

  return true;
};

export const CPFInput = React.forwardRef<HTMLInputElement, CPFInputProps>(
  ({ value = '', onChange, onBlur, error: externalError, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');
    const [error, setError] = useState<string | undefined>(externalError);

    useEffect(() => {
      if (value) {
        setDisplayValue(formatCPF(value));
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
      
      if (cleaned.length <= 11) {
        const formatted = formatCPF(cleaned);
        setDisplayValue(formatted);
        onChange?.(cleaned);
        setError(undefined);
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const cleaned = displayValue.replace(/\D/g, '');
      if (cleaned.length === 11 && !validateCPF(cleaned)) {
        setError('Invalid CPF');
      } else if (cleaned.length > 0 && cleaned.length < 11) {
        setError('CPF must have 11 digits');
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
        maxLength={14}
        placeholder="000.000.000-00"
        error={error}
        {...props}
      />
    );
  }
);

CPFInput.displayName = 'CPFInput';


