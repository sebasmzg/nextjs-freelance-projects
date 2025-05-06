import React from 'react';

interface ErrorMessageProps {
    message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
    if (!message) return null;

    return (
        <p className='p-3 text-red-700 rounded-md text-sm' role="alert">
            {message}
        </p>
    )
}
