import React, { forwardRef } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: Option[];
}

export const Select= forwardRef<HTMLSelectElement, SelectProps>((initialProps, ref) => {
    const {
        hasError,
    className,
    options,
    ...props
    } = initialProps;
    const baseClasses = "block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 sm:text-sm";
    const errorClasses = hasError ? "border-red-500" : "border-gray-300";

    return (
        <select
            className={`${baseClasses} ${errorClasses} ${className || ''}`}
            {...props}
        >
            {options.map(({label, value})=>(
                <option key={value} value={value}>
                    {label}
                </option>
            ))}
        </select>
    )
})

Select.displayName = "Select";