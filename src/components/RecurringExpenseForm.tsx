'use client';

import React, { useState } from 'react';
import { FrequencyType } from '@/lib/types';
import { useFinance } from '@/contexts/FinanceContext';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';

interface RecurringExpenseFormProps {
    onSuccess?: () => void;
}

export default function RecurringExpenseForm({ onSuccess }: RecurringExpenseFormProps) {
    const { addRecurringExpense, userSettings } = useFinance();
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [frequency, setFrequency] = useState<FrequencyType>('monthly');
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        if (!category) {
            alert('Please select a category');
            return;
        }

        setIsSubmitting(true);

        try {
            addRecurringExpense({
                title,
                amount: Number(amount),
                category,
                frequency,
                startDate,
                isActive: true,
            });

            // Reset form
            setTitle('');
            setAmount('');
            setCategory('');
            setFrequency('monthly');
            setStartDate(new Date().toISOString().split('T')[0]);

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error('Error adding recurring expense:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const frequencyOptions = [
        { value: 'monthly', label: 'Monthly' },
        { value: 'biweekly', label: 'Bi-weekly (every 2 weeks)' },
        { value: 'weekly', label: 'Weekly (every Saturday)' },
        { value: 'weekdays', label: 'Weekdays (Mon-Fri)' },
        { value: 'daily', label: 'Daily (7 days a week)' },
    ];

    const categoryOptions = [
        { value: '', label: 'Select a category' },
        ...userSettings.categories.map(cat => ({ value: cat, label: cat })),
    ];

    return (
        <Card title="Add Recurring Expense">
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        id="title"
                        name="title"
                        label="Title"
                        type="text"
                        placeholder="e.g., Rent, Netflix, Gym membership"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        className="placeholder-gray-500"
                    />

                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-200 mb-1">
                            Amount
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-400 sm:text-sm">$</span>
                            </div>
                            <Input
                                type="number"
                                id="amount"
                                name="amount"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                min="0.01"
                                step="0.01"
                                required
                                className="pl-8"
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            id="category"
                            name="category"
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={categoryOptions}
                            required
                            fullWidth
                        />

                        <Select
                            id="frequency"
                            name="frequency"
                            label="Frequency"
                            value={frequency}
                            onChange={(e) => setFrequency(e.target.value as FrequencyType)}
                            options={frequencyOptions}
                            fullWidth
                        />
                    </div>

                    <div className="mt-3">
                        <Input
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            fullWidth
                        />
                    </div>

                    <Button
                        type="submit"
                        fullWidth
                        variant="primary"
                        disabled={isSubmitting}
                        className="mt-6"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            'Add Recurring Expense'
                        )}
                    </Button>
                </form>
            </div>
        </Card>
    );
} 