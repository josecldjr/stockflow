import React from 'react';
import { Input, InputProps } from './Input';

export interface DateTimePickerProps extends Omit<InputProps, 'type'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DateTimePicker = React.forwardRef<HTMLInputElement, DateTimePickerProps>(
  ({ value, onChange, ...props }, ref) => {
    return <Input ref={ref} type="datetime-local" value={value} onChange={onChange} {...props} />;
  }
);

DateTimePicker.displayName = 'DateTimePicker';


