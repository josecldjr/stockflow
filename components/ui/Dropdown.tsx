import React from 'react';

export interface DropdownOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: DropdownOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
}

export const Dropdown = React.forwardRef<HTMLSelectElement, DropdownProps>(
  ({ label, options, error, helperText, placeholder, className = '', ...props }, ref) => {
    const baseStyles =
      'w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 appearance-none bg-white cursor-pointer';
    const defaultStyles = 'border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500';
    const errorStyles = 'border-red-500 bg-red-50 text-red-900 focus:ring-red-500 focus:border-red-500';
    const disabledStyles = 'bg-gray-100 text-gray-500 cursor-not-allowed';

    const selectStyles = `
      ${baseStyles}
      ${error ? errorStyles : defaultStyles}
      ${props.disabled ? disabledStyles : ''}
      ${className}
    `.trim();

    return (
      <div className="w-full relative">
        {label && (
          <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select ref={ref} className={selectStyles} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Dropdown.displayName = 'Dropdown';

