'use client';

import React, { SelectHTMLAttributes, forwardRef } from 'react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
    fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ className = '', label, options, error, fullWidth = false, ...props }, ref) => {
        const baseStyles = 'block w-full rounded-md border-dark-600 bg-dark-700 shadow-sm focus:border-accent-blue focus:ring-accent-blue text-white sm:text-sm';
        const errorStyles = error ? 'border-accent-red text-accent-red focus:border-accent-red focus:ring-accent-red' : '';
        const widthStyles = fullWidth ? 'w-full' : '';

        const combinedClassName = `${baseStyles} ${errorStyles} ${widthStyles} ${className}`;

        return (
            <div className={fullWidth ? 'w-full' : ''}>
                {label && (
                    <label htmlFor={props.id} className="block text-sm font-medium text-gray-200 mb-1">
                        {label}
                    </label>
                )}
                <select ref={ref} className={combinedClassName} {...props}>
                    {options.map((option, index) => (
                        <option
                            key={option.value}
                            value={option.value}
                            className={`text-white bg-dark-700 ${option.value === '' ? 'text-gray-400' : ''}`}
                        >
                            {option.label}
                        </option>
                    ))}
                </select>
                {error && <p className="mt-1 text-sm text-accent-red">{error}</p>}
            </div>
        );
    }
);

Select.displayName = 'Select';

export default Select; 