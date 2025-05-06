import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "success" | "warning";
    size?: "small" | "medium" | "large";
    isLoading?: boolean;
}

export const Button = ({
    className,
    children,
    variant = "primary",
    size = "medium",
    isLoading = false,
    disabled,
}: ButtonProps) => {
    const baseClasses = "group relative w-full justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed";
    const primaryClasses = "text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500";
    const secondaryClasses = "text-gray-700 bg-white hover:bg-indigo-50 focus:ring-indigo-500";
    const dangerClasses = "text-white bg-red-600 hover:bg-red-700 focus:ring-red-500";
    const successClasses = "text-white bg-green-600 hover:bg-green-700 focus:ring-green-500";
    const warningClasses = "text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500";

    const variantClasses = {
        primary: primaryClasses,
        secondary: secondaryClasses,
        danger: dangerClasses,
        success: successClasses,
        warning: warningClasses,
    }

    const sizeClasses = {
        small: "px-2 py-1 text-sm",
        medium: "px-4 py-2 text-base",
        large: "px-6 py-3 text-lg",
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className || ""}`}
            disabled={isLoading || disabled}
            {...(isLoading && { "aria-busy": true })}
        >
            {isLoading ? (
                //todo spinner como componente reutilizable
                <span className="animate-spin mr-2">⏳</span>
            ): null}
            {children}
        </button>
    );
}