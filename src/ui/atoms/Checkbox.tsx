import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label:string;
    hasError?: boolean
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((initialProps, ref) => {
    const {
        label,
        className,
        hasError,
        ...props 
    } = initialProps;

    const baseClasses = "flex items-center space-x-2"
    const checkboxClasses = "h-4 w-4 text-indigo-600 border-gray-300 rounded"
    const spanClasses = `text-sm ${hasError ? 'text-red-600' : 'text-gray-700'}`;
    return (
        <label
            className={`${baseClasses} ${className || ''}`}
        >
            <input type="checkbox" className={checkboxClasses} {...props}/>
            <span className={spanClasses}>{label}</span>
        </label>
    )
});

Checkbox.displayName = "Checkbox"