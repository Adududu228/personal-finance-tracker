'use client';

import React, { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    footer?: React.ReactNode;
}

export default function Card({
    children,
    className = '',
    title,
    footer,
    ...props
}: CardProps) {
    return (
        <div
            className={`bg-dark-card overflow-hidden shadow-dark-md rounded-lg border border-dark-border ${className}`}
            {...props}
        >
            {title && (
                <div className="px-3 py-4 sm:px-4 sm:py-5 border-b border-dark-700 bg-dark-900/70">
                    <h3 className="text-base sm:text-lg font-medium leading-6 text-white">{title}</h3>
                </div>
            )}
            <div className="overflow-hidden">{children}</div>
            {footer && (
                <div className="px-3 py-3 sm:px-4 sm:py-4 bg-dark-800/80 border-t border-dark-700">
                    {footer}
                </div>
            )}
        </div>
    );
} 