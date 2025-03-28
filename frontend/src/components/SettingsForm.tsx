'use client';

import React, { useState } from 'react';
import { useFinance } from '@/contexts/FinanceContext';
import { DEFAULT_CATEGORIES } from '@/lib/utils';
import Button from './ui/Button';
import Input from './ui/Input';
import Card from './ui/Card';

export default function SettingsForm() {
    const { userSettings, updateUserSettings } = useFinance();
    const [monthlyBudget, setMonthlyBudget] = useState(userSettings.monthlyBudget.toString());
    const [categories, setCategories] = useState(userSettings.categories.join(', '));
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!monthlyBudget || isNaN(Number(monthlyBudget)) || Number(monthlyBudget) <= 0) {
            alert('Please enter a valid monthly budget');
            return;
        }

        setIsSubmitting(true);

        try {
            const categoriesList = categories
                .split(',')
                .map(cat => cat.trim())
                .filter(cat => cat); // Remove empty strings

            updateUserSettings({
                monthlyBudget: Number(monthlyBudget),
                categories: categoriesList,
            });

            alert('Settings saved successfully!');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('An error occurred while saving settings');
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetToDefaults = () => {
        if (confirm('Are you sure you want to reset to default settings?')) {
            setMonthlyBudget('3000');
            setCategories(DEFAULT_CATEGORIES.join(', '));

            updateUserSettings({
                monthlyBudget: 3000,
                categories: DEFAULT_CATEGORIES,
            });

            alert('Settings reset to defaults');
        }
    };

    return (
        <Card title="Settings">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="monthlyBudget" className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Budget
                    </label>
                    <div className="relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input
                            type="number"
                            id="monthlyBudget"
                            name="monthlyBudget"
                            placeholder="0.00"
                            value={monthlyBudget}
                            onChange={(e) => setMonthlyBudget(e.target.value)}
                            min="0.01"
                            step="0.01"
                            required
                            className="pl-8"
                            fullWidth
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="categories" className="block text-sm font-medium text-gray-700 mb-1">
                        Categories (comma-separated)
                    </label>
                    <textarea
                        id="categories"
                        name="categories"
                        rows={4}
                        value={categories}
                        onChange={(e) => setCategories(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm text-black"
                        placeholder="Housing, Food, Transportation, etc."
                    />
                    <p className="mt-1 text-xs text-gray-500">
                        Enter categories separated by commas (e.g., "Housing, Food, Transportation").
                    </p>
                </div>

                <div className="flex space-x-4">
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Settings'}
                    </Button>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={resetToDefaults}
                        disabled={isSubmitting}
                    >
                        Reset to Defaults
                    </Button>
                </div>
            </form>
        </Card>
    );
} 