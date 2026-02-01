import React from 'react';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  ({ label, helperText, error, className = '', id, ...props }, ref) => {
    const toggleId = id || `toggle-${Math.random().toString(36).slice(2, 11)}`;

    return (
      <div className={`flex items-start gap-3 ${className}`}>
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            type="checkbox"
            id={toggleId}
            className="sr-only peer"
            {...props}
          />
          <label
            htmlFor={toggleId}
            className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-gray-300 transition-colors duration-200 ease-in-out focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 peer-checked:bg-blue-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
          >
            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-6" />
          </label>
        </div>
        <div className="flex-1">
          {label && (
            <label
              htmlFor={toggleId}
              className="block text-sm font-medium text-gray-700 cursor-pointer"
            >
              {label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
        </div>
      </div>
    );
  }
);

Toggle.displayName = 'Toggle';

