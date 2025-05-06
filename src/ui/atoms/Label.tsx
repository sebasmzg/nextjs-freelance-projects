import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label = ({
    className,
    children,
    ...props
}: LabelProps) => {
    const baseClasses = "block text-sm font-medium text-gray-700 mb-1";
    return (
        <label className={`${baseClasses} ${className || ''}`} {...props}>
            {children}
        </label>
    );
}
