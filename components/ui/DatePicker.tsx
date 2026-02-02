import React from 'react';
import { Input, InputProps } from './Input';

export interface DatePickerProps extends Omit<InputProps, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, onChange, ...props }, ref) => {
    return <Input ref={ref} type="date" value={value} onChange={onChange} {...props} />;
  }
);

DatePicker.displayName = 'DatePicker';


