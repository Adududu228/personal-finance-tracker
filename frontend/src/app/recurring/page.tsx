'use client';

import React, { useState } from 'react';
import RecurringExpenseForm from '@/components/RecurringExpenseForm';
import RecurringExpenseList from '@/components/RecurringExpenseList';

export default function RecurringExpensesPage() {
    const [isAddingExpense, setIsAddingExpense] = useState(false);

    return (
        <div className="space-y-6 px-2 sm:px-0">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Recurring Expenses
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Manage your monthly bills and subscriptions
                    </p>
                </div>
                <div className="mt-4 flex md:ml-4 md:mt-0">
                    <button
                        type="button"
                        onClick={() => setIsAddingExpense(!isAddingExpense)}
                        className="ml-3 inline-flex items-center rounded-md bg-accent-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-indigo transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue"
                    >
                        {isAddingExpense ? 'Cancel' : 'Add Recurring Expense'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {isAddingExpense && (
                    <div className="sm:max-w-2xl">
                        <RecurringExpenseForm onSuccess={() => setIsAddingExpense(false)} />
                    </div>
                )}

                <RecurringExpenseList />
            </div>
        </div>
    );
} 