'use client';

import React, { useState } from 'react';
import Card from './ui/Card';
import Button from './ui/Button';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency } from '@/lib/utils';

// Define category colors
const categoryColors: Record<string, string> = {
    housing: 'bg-accent-blue',
    transportation: 'bg-accent-green',
    food: 'bg-accent-yellow',
    utilities: 'bg-accent-red',
    entertainment: 'bg-accent-purple',
    healthcare: 'bg-accent-indigo',
    personal: 'bg-accent-pink',
    education: 'bg-blue-500',
    debt: 'bg-red-600',
    savings: 'bg-green-600',
    other: 'bg-gray-500'
};

const frequencyText: Record<string, string> = {
    monthly: 'Monthly',
    weekly: 'Weekly',
    biweekly: 'Bi-weekly',
    weekdays: 'Weekdays',
    daily: 'Daily'
};

// Define frequency badge colors
const frequencyColors: Record<string, { bg: string, text: string }> = {
    monthly: { bg: 'bg-accent-purple/20', text: 'text-accent-purple' },
    weekly: { bg: 'bg-accent-green/20', text: 'text-accent-green' },
    biweekly: { bg: 'bg-accent-blue/20', text: 'text-accent-blue' },
    weekdays: { bg: 'bg-accent-red/20', text: 'text-accent-red' },
    daily: { bg: 'bg-accent-indigo/20', text: 'text-accent-indigo' }
};

const RecurringExpenseList = () => {
    const { recurringExpenses, toggleRecurringExpense, deleteRecurringExpense } = useFinance();
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    const handleToggle = (id: string) => {
        toggleRecurringExpense(id);
    };

    const handleDelete = (id: string) => {
        if (confirmDelete === id) {
            deleteRecurringExpense(id);
            setConfirmDelete(null);
        } else {
            setConfirmDelete(id);
        }
    };

    const getCategoryColor = (category: string) => {
        return categoryColors[category.toLowerCase()] || 'bg-gray-500';
    };

    const getFrequencyColor = (frequency: string) => {
        return frequencyColors[frequency] || { bg: 'bg-gray-700', text: 'text-gray-400' };
    };

    return (
        <Card title="Recurring Expenses">
            <div className="p-4">
                {recurringExpenses.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No recurring expenses to display</p>
                        <p className="text-sm text-gray-500 mt-2">Add recurring expenses to see them here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {recurringExpenses.map((expense) => {
                            const frequencyColor = getFrequencyColor(expense.frequency);

                            return (
                                <div
                                    key={expense.id}
                                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border transition-colors ${expense.isActive
                                        ? 'bg-dark-800/50 border-dark-700 hover:bg-dark-700/70'
                                        : 'bg-dark-900/50 border-dark-800 text-gray-400 hover:bg-dark-900/70'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <div className="hidden sm:block mr-3">
                                            <div
                                                className={`w-3 h-10 ${expense.isActive
                                                    ? getCategoryColor(expense.category)
                                                    : 'bg-gray-600'
                                                    } rounded-l-full`}
                                                style={{ opacity: expense.isActive ? 1 : 0.5 }}
                                            ></div>
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center flex-wrap">
                                                <span className={`font-medium mr-2 ${expense.isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    {expense.title}
                                                </span>
                                                <span className={`text-xs rounded-full px-2 py-0.5 mb-1 ${expense.isActive
                                                    ? `${frequencyColor.bg} ${frequencyColor.text}`
                                                    : 'bg-gray-700 text-gray-400'
                                                    }`}>
                                                    {frequencyText[expense.frequency]}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-xs text-gray-500 mt-1">
                                                <span className="capitalize truncate">{expense.category}</span>
                                                <span className="mx-2">•</span>
                                                <span className={expense.isActive ? 'text-accent-blue' : 'text-gray-500'}>
                                                    {formatCurrency(expense.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end mt-3 sm:mt-0">
                                        <Button
                                            variant={expense.isActive ? "secondary" : "outline"}
                                            size="sm"
                                            className="mr-2"
                                            onClick={() => handleToggle(expense.id)}
                                        >
                                            {expense.isActive ? 'Deactivate' : 'Activate'}
                                        </Button>
                                        <Button
                                            variant={confirmDelete === expense.id ? "danger" : "ghost"}
                                            size="sm"
                                            onClick={() => handleDelete(expense.id)}
                                        >
                                            {confirmDelete === expense.id ? 'Confirm' : 'Delete'}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default RecurringExpenseList;