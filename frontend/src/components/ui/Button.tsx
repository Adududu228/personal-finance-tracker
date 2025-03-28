'use client';

import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export default function Button({
    children,
    className = '',
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    ...props
}: ButtonProps) {
    const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-1 focus:ring-offset-dark-800 disabled:opacity-50 disabled:pointer-events-none';

    const variantStyles = {
        primary: 'bg-accent-blue text-white hover:bg-blue-600',
        secondary: 'bg-dark-600 text-white hover:bg-dark-500',
        outline: 'border border-dark-500 bg-transparent text-gray-300 hover:bg-dark-700 hover:text-white',
        ghost: 'bg-transparent text-gray-300 hover:bg-dark-700 hover:text-white',
        danger: 'bg-accent-red text-white hover:bg-red-600',
    };

    const sizeStyles = {
        sm: 'text-sm h-9 px-3',
        md: 'text-base h-10 px-4',
        lg: 'text-lg h-12 px-6',
    };

    const widthStyles = fullWidth ? 'w-full' : '';

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`;

    return (
        <button className={combinedClassName} {...props}>
            {children}
        </button>
    );
} 