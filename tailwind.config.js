const { theme } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            screens: {
                'xs': '480px',
            },
            colors: {
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                },
                // Dark theme colors
                dark: {
                    50: '#f9fafb',
                    100: '#f3f4f6',
                    200: '#e5e7eb',
                    300: '#d1d5db',
                    400: '#9ca3af',
                    500: '#6b7280',
                    600: '#4b5563',
                    700: '#374151',
                    800: '#1f2937',
                    900: '#111827',
                },
                // Accent colors for dark theme
                accent: {
                    blue: '#3b82f6',
                    green: '#10b981',
                    red: '#ef4444',
                    yellow: '#f59e0b',
                    purple: '#8b5cf6',
                    pink: '#ec4899',
                    indigo: '#6366f1',
                },
            },
            backgroundColor: {
                'dark-card': 'rgba(31, 41, 55, 0.8)',
                'dark-card-alt': 'rgba(55, 65, 81, 0.5)',
            },
            borderColor: {
                'dark-border': 'rgba(75, 85, 99, 0.5)',
            },
            boxShadow: {
                'dark-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.4)',
                'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
            },
            gradientColorStops: {
                'dark-gradient-start': 'rgba(17, 24, 39, 1)',
                'dark-gradient-end': 'rgba(31, 41, 55, 1)',
            },
        },
    },
    plugins: [],
} 