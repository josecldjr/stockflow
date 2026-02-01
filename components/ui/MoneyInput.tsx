import React, { useState, useEffect } from 'react';
import { Input, InputProps } from './Input';

export interface MoneyInputProps extends Omit<InputProps, 'value' | 'onChange' | 'type'> {
  value?: number | string;
  onChange?: (value: number) => void;
  currency?: string;
}

export const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ value, onChange, currency = 'BRL', className = '', ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('');

    useEffect(() => {
      if (value !== undefined && value !== null && value !== '') {
        const numValue = typeof value === 'string' ? parseFloat(value.replace(/[^\d,.-]/g, '').replace(',', '.')) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(formatCurrency(numValue));
        } else {
          setDisplayValue('');
        }
      } else {
        setDisplayValue('');
      }
    }, [value]);

    const formatCurrency = (num: number): string => {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(num);
    };

    const parseValue = (formattedValue: string): number => {
      const cleaned = formattedValue.replace(/[^\d,.-]/g, '').replace(',', '.');
      const parsed = parseFloat(cleaned);
      return isNaN(parsed) ? 0 : parsed;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      
      // Allow user to type numbers
      const numbersOnly = inputValue.replace(/[^\d,.-]/g, '');
      
      if (numbersOnly === '' || numbersOnly === ',') {
        setDisplayValue('');
        onChange?.(0);
        return;
      }

      const parsed = parseValue(numbersOnly);
      const formatted = formatCurrency(parsed);
      
      setDisplayValue(formatted);
      onChange?.(parsed);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const parsed = parseValue(displayValue);
      if (parsed > 0) {
        setDisplayValue(formatCurrency(parsed));
      }
      props.onBlur?.(e);
    };

    return (
      <Input
        ref={ref}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={props.placeholder || 'R$ 0,00'}
        className={className}
        {...props}
      />
    );
  }
);

MoneyInput.displayName = 'MoneyInput';

