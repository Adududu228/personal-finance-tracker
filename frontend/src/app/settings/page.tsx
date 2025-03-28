'use client';

import React, { useState } from 'react';
import { useSettings } from '@/hooks/useSettings';
import Card from '@/components/ui/Card';

export default function Settings() {
    const { settings, updateSettings } = useSettings();
    const [formState, setFormState] = useState({
        currency: settings?.currency || 'USD',
        monthlyBudget: settings?.monthlyBudget || 0,
        colorTheme: settings?.colorTheme || 'dark',
        notifications: settings?.notifications !== false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        const numVal = name === 'monthlyBudget' && typeof val === 'string' ? parseFloat(val) : val;

        setFormState({
            ...formState,
            [name]: numVal,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateSettings(formState);
        alert('Settings saved successfully!');
    };

    return (
        <div className="space-y-6 px-2 sm:px-0">
            <div>
                <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                    Settings
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                    Configure your finance tracker preferences
                </p>
            </div>

            <div className="max-w-2xl">
                <Card title="Account Settings">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Currency Selection */}
                            <div>
                                <label htmlFor="currency" className="block text-sm font-medium text-white">
                                    Currency
                                </label>
                                <select
                                    id="currency"
                                    name="currency"
                                    value={formState.currency}
                                    onChange={handleChange}
                                    className="mt-1 block w-full rounded-md bg-background-dark border border-gray-700 py-2 px-3 shadow-sm focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue text-white text-sm"
                                >
                                    <option value="USD">US Dollar ($)</option>
                                    <option value="EUR">Euro (€)</option>
                                    <option value="GBP">British Pound (£)</option>
                                    <option value="JPY">Japanese Yen (¥)</option>
                                    <option value="CAD">Canadian Dollar (C$)</option>
                                    <option value="AUD">Australian Dollar (A$)</option>
                                    <option value="INR">Indian Rupee (₹)</option>
                                </select>
                            </div>

                            {/* Monthly Budget */}
                            <div>
                                <label htmlFor="monthlyBudget" className="block text-sm font-medium text-white">
                                    Monthly Budget
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-400 sm:text-sm">
                                            {formState.currency === 'USD' ? '$' :
                                                formState.currency === 'EUR' ? '€' :
                                                    formState.currency === 'GBP' ? '£' :
                                                        formState.currency === 'JPY' ? '¥' :
                                                            formState.currency === 'CAD' ? 'C$' :
                                                                formState.currency === 'AUD' ? 'A$' :
                                                                    formState.currency === 'INR' ? '₹' : '$'}
                                        </span>
                                    </div>
                                    <input
                                        type="number"
                                        name="monthlyBudget"
                                        id="monthlyBudget"
                                        value={formState.monthlyBudget}
                                        onChange={handleChange}
                                        className="block w-full rounded-md bg-background-dark border border-gray-700 py-2 pl-10 pr-3 shadow-sm focus:border-accent-blue focus:outline-none focus:ring-1 focus:ring-accent-blue text-white text-sm"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                    />
                                </div>
                            </div>

                            {/* Color Theme */}
                            <div>
                                <label htmlFor="colorTheme" className="block text-sm font-medium text-white">
                                    Color Theme
                                </label>
                                <div className="mt-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-md hover:bg-background-card cursor-pointer">
                                        <input
                                            type="radio"
                                            name="colorTheme"
                                            value="dark"
                                            checked={formState.colorTheme === 'dark'}
                                            onChange={handleChange}
                                            className="h-4 w-4 border-gray-300 text-accent-blue focus:ring-accent-blue"
                                        />
                                        <span className="text-sm text-white">Dark</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-md hover:bg-background-card cursor-pointer">
                                        <input
                                            type="radio"
                                            name="colorTheme"
                                            value="light"
                                            checked={formState.colorTheme === 'light'}
                                            onChange={handleChange}
                                            className="h-4 w-4 border-gray-300 text-accent-blue focus:ring-accent-blue"
                                        />
                                        <span className="text-sm text-white">Light</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-md hover:bg-background-card cursor-pointer">
                                        <input
                                            type="radio"
                                            name="colorTheme"
                                            value="blue"
                                            checked={formState.colorTheme === 'blue'}
                                            onChange={handleChange}
                                            className="h-4 w-4 border-gray-300 text-accent-blue focus:ring-accent-blue"
                                        />
                                        <span className="text-sm text-white">Blue</span>
                                    </label>
                                    <label className="flex items-center space-x-3 p-3 border border-gray-700 rounded-md hover:bg-background-card cursor-pointer">
                                        <input
                                            type="radio"
                                            name="colorTheme"
                                            value="purple"
                                            checked={formState.colorTheme === 'purple'}
                                            onChange={handleChange}
                                            className="h-4 w-4 border-gray-300 text-accent-blue focus:ring-accent-blue"
                                        />
                                        <span className="text-sm text-white">Purple</span>
                                    </label>
                                </div>
                            </div>

                            {/* Notifications */}
                            <div className="flex items-center">
                                <input
                                    id="notifications"
                                    name="notifications"
                                    type="checkbox"
                                    checked={formState.notifications}
                                    onChange={handleChange}
                                    className="h-4 w-4 rounded border-gray-300 text-accent-blue focus:ring-accent-blue"
                                />
                                <label htmlFor="notifications" className="ml-3 block text-sm text-white">
                                    Enable Notifications
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="inline-flex justify-center rounded-md border border-transparent bg-accent-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-accent-indigo focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2"
                            >
                                Save Settings
                            </button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
} 