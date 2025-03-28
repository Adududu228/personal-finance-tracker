'use client';

import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = '', label, error, fullWidth = false, ...props }, ref) => {
        const baseStyles = 'block rounded-md border-dark-600 bg-dark-700 shadow-sm focus:border-accent-blue focus:ring-accent-blue text-white placeholder-gray-400 sm:text-sm';
        const errorStyles = error ? 'border-accent-red text-accent-red placeholder-red-300 focus:border-accent-red focus:ring-accent-red' : '';
        const widthStyles = fullWidth ? 'w-full' : '';

        const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`;

        return (
            <div className={fullWidth ? 'w-full' : ''}>
                {label && (
                    <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-1">
                        {label}
                    </label>
                )}
                <input ref={ref} className={combinedClassName} {...props} />
                {error && <p className="mt-1 text-sm text-accent-red">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input; 