import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (initialProps, ref) => {
    const { hasError, className, ...props } = initialProps;

    const baseClasses =
      "appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm";
    const errorClasses = hasError ? "border-red-500" : "border-gray-300";

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${errorClasses} ${className || ""}`}
        aria-invalid={hasError ? "true" : "false"}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
