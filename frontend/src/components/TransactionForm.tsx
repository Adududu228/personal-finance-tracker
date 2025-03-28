'use client';

import React, { useState } from 'react';
import { TransactionType } from '@/lib/types';
import { useFinance } from '@/contexts/FinanceContext';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';
import Card from './ui/Card';

export default function TransactionForm() {
    const { addTransaction, userSettings } = useFinance();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState<TransactionType>('expense');
    const [category, setCategory] = useState('');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        setIsSubmitting(true);

        try {
            addTransaction({
                amount: Number(amount),
                type,
                category: category || undefined,
                note: note || undefined,
            });

            // Reset form
            setAmount('');
            setType('expense');
            setCategory('');
            setNote('');
        } catch (error) {
            console.error('Error adding transaction:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const transactionTypeOptions = [
        { value: 'expense', label: '💸 Expense' },
        { value: 'income', label: '💰 Income' },
    ];

    const categoryOptions = [
        { value: '', label: 'Select a category (optional)' },
        ...userSettings.categories.map(cat => ({ value: cat, label: cat })),
    ];

    return (
        <Card title="Add Transaction" className="hover:shadow-xl transition-shadow duration-300">
            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="mb-4">
                        <label htmlFor="amount" className="sr-only">
                            Amount
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-gray-300 sm:text-sm">$</span>
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
                                className="pl-8 text-base sm:text-lg py-3 sm:py-4 h-14 sm:h-16 text-center font-bold ring-accent-blue focus:ring-2"
                                fullWidth
                                aria-describedby="amount-currency"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Select
                            id="type"
                            name="type"
                            label="Transaction Type"
                            value={type}
                            onChange={(e) => setType(e.target.value as TransactionType)}
                            options={transactionTypeOptions}
                            fullWidth
                            className="ring-accent-blue focus:ring-2"
                        />

                        <Select
                            id="category"
                            name="category"
                            label="Category (optional)"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            options={categoryOptions}
                            fullWidth
                            className="ring-accent-blue focus:ring-2"
                        />
                    </div>

                    <Input
                        id="note"
                        name="note"
                        label="Note (optional)"
                        type="text"
                        placeholder="Add a note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        fullWidth
                        className="ring-accent-blue focus:ring-2"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        size="lg"
                        disabled={isSubmitting}
                        className="mt-6 bg-gradient-to-r from-accent-blue to-accent-indigo hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:-translate-y-0.5"
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
                            'Save Transaction'
                        )}
                    </Button>
                </form>
            </div>
        </Card>
    );
} 