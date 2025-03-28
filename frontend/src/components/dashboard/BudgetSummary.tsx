'use client';

import React from 'react';
import Card from '../ui/Card';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency, calculateRecurringExpenses } from '@/lib/utils';
import { format } from 'date-fns';

const BudgetSummary = () => {
    const { budget, transactions, recurringExpenses } = useFinance();
    const currentMonth = format(new Date(), 'MMMM yyyy');

    // Calculate total spent
    const totalSpent = transactions.reduce((sum, transaction) => {
        if (transaction.type === 'expense') {
            return sum + transaction.amount;
        }
        return sum;
    }, 0);

    // Calculate total recurring expenses including frequency adjustments
    const totalRecurring = calculateRecurringExpenses(recurringExpenses);

    // Calculate remaining budget
    const remaining = budget - totalSpent - totalRecurring;

    // Calculate percentages for progress bar (handle zero budget case)
    const spentPercentage = budget > 0 ? Math.min(100, Math.round((totalSpent / budget) * 100)) : 0;
    const recurringPercentage = budget > 0 ? Math.min(100 - spentPercentage, Math.round((totalRecurring / budget) * 100)) : 0;
    const totalPercentage = spentPercentage + recurringPercentage;

    // Group recurring expenses by frequency
    const frequencyGroups = {
        monthly: 0,
        biweekly: 0,
        weekly: 0,
        weekdays: 0,
        daily: 0
    };

    recurringExpenses.forEach(expense => {
        if (expense.isActive && expense.frequency in frequencyGroups) {
            frequencyGroups[expense.frequency as keyof typeof frequencyGroups] += expense.amount;
        }
    });

    return (
        <Card title={`Monthly Budget Summary - ${currentMonth}`}>
            <div className="p-4 space-y-4">
                {/* Budget progress bar */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-200">Budget Usage</span>
                        <span className="text-sm font-medium text-gray-200">{totalPercentage}%</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-2.5">
                        <div className="flex h-2.5 rounded-full">
                            <div
                                className="bg-accent-blue rounded-l-full"
                                style={{ width: `${spentPercentage}%` }}
                            ></div>
                            <div
                                className="bg-accent-purple"
                                style={{ width: `${recurringPercentage}%`, borderTopRightRadius: totalPercentage === 100 ? '0.375rem' : '0', borderBottomRightRadius: totalPercentage === 100 ? '0.375rem' : '0' }}
                            ></div>
                        </div>
                    </div>
                    <div className="flex text-xs justify-between">
                        <span className="text-accent-blue flex items-center">
                            <div className="h-2 w-2 bg-accent-blue rounded-full mr-1"></div>
                            Spent
                        </span>
                        <span className="text-accent-purple flex items-center">
                            <div className="h-2 w-2 bg-accent-purple rounded-full mr-1"></div>
                            Recurring
                        </span>
                    </div>
                </div>

                {/* Budget details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {/* Total spent */}
                    <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700">
                        <p className="text-sm text-gray-300 mb-1">Total Spent</p>
                        <p className="text-lg font-semibold text-accent-blue">{formatCurrency(totalSpent)}</p>
                    </div>

                    {/* Recurring Expenses */}
                    <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700">
                        <div className="flex justify-between">
                            <p className="text-sm text-gray-300 mb-1">Recurring Expenses</p>
                            <div className="group relative">
                                <button className="text-xs text-gray-400 hover:text-white flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                                <div className="absolute z-10 invisible group-hover:visible bg-dark-900 text-gray-300 text-xs p-2 rounded-md shadow-lg w-60 -right-4 top-6">
                                    <p className="mb-1 font-medium">Monthly Calculation:</p>
                                    <ul className="list-disc pl-3 space-y-1">
                                        <li>Monthly: Exact amount</li>
                                        <li>Bi-weekly: Amount × number of pay periods</li>
                                        <li>Weekly: Amount × number of Saturdays</li>
                                        <li>Weekdays: Amount × number of weekdays (Mon-Fri)</li>
                                        <li>Daily: Amount × days in month</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <p className="text-lg font-semibold text-accent-purple">{formatCurrency(totalRecurring)}</p>
                    </div>

                    {/* Remaining Budget */}
                    <div className="bg-dark-800/50 p-3 rounded-lg border border-dark-700 sm:col-span-2 md:col-span-1">
                        <p className="text-sm text-gray-300 mb-1">Remaining Budget</p>
                        <p className={`text-lg font-semibold ${remaining < 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                            {formatCurrency(remaining)}
                        </p>
                    </div>
                </div>

                {/* Recurring expenses breakdown */}
                {(Object.values(frequencyGroups).some(value => value > 0)) && (
                    <div className="mt-4 p-3 rounded-lg border border-dark-700 bg-dark-800/50 overflow-hidden">
                        <h3 className="text-sm font-medium text-gray-200 mb-2">Recurring Expenses Breakdown</h3>
                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 overflow-x-auto">
                            {frequencyGroups.monthly > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 flex items-center">
                                        <span className="inline-block w-2 h-2 bg-accent-purple rounded-full mr-2"></span>
                                        Monthly
                                    </span>
                                    <span className="font-medium text-accent-purple">{formatCurrency(frequencyGroups.monthly)}</span>
                                </div>
                            )}
                            {frequencyGroups.biweekly > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 flex items-center">
                                        <span className="inline-block w-2 h-2 bg-accent-blue rounded-full mr-2"></span>
                                        Bi-weekly
                                    </span>
                                    <span className="font-medium text-accent-blue">{formatCurrency(frequencyGroups.biweekly)}</span>
                                </div>
                            )}
                            {frequencyGroups.weekly > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 flex items-center">
                                        <span className="inline-block w-2 h-2 bg-accent-green rounded-full mr-2"></span>
                                        Weekly
                                    </span>
                                    <span className="font-medium text-accent-green">{formatCurrency(frequencyGroups.weekly)}</span>
                                </div>
                            )}
                            {frequencyGroups.weekdays > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 flex items-center">
                                        <span className="inline-block w-2 h-2 bg-accent-red rounded-full mr-2"></span>
                                        Weekdays
                                    </span>
                                    <span className="font-medium text-accent-red">{formatCurrency(frequencyGroups.weekdays)}</span>
                                </div>
                            )}
                            {frequencyGroups.daily > 0 && (
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-300 flex items-center">
                                        <span className="inline-block w-2 h-2 bg-accent-indigo rounded-full mr-2"></span>
                                        Daily
                                    </span>
                                    <span className="font-medium text-accent-indigo">{formatCurrency(frequencyGroups.daily)}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-2 pt-2 border-t border-dark-700 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-200">Total Recurring:</span>
                            <span className="font-bold text-white">{formatCurrency(totalRecurring)}</span>
                        </div>
                    </div>
                )}

                {/* Budget Impact */}
                <div className="mt-4 p-3 rounded-lg border border-dark-700 bg-dark-800/50">
                    <h3 className="text-sm font-medium text-gray-200 mb-2">Budget Impact</h3>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">Initial Budget:</span>
                        <span className="font-medium text-white">{formatCurrency(budget || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                        <span className="text-sm text-gray-300">Planned Spending:</span>
                        <span className="font-medium text-accent-red">-{formatCurrency(totalSpent + totalRecurring)}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-dark-700">
                        <span className="text-sm font-medium text-gray-200">Final Remaining:</span>
                        <span className={`font-bold ${remaining < 0 ? 'text-accent-red' : 'text-accent-green'}`}>
                            {formatCurrency(remaining)}
                        </span>
                    </div>
                </div>

                {/* Budget status indicator */}
                <div className={`mt-4 p-3 rounded-lg text-center ${remaining < 0
                    ? 'bg-accent-red/20 border border-accent-red/30'
                    : remaining < (budget * 0.1)
                        ? 'bg-accent-yellow/20 border border-accent-yellow/30'
                        : 'bg-accent-green/20 border border-accent-green/30'
                    }`}>
                    <p className={`font-medium ${remaining < 0
                        ? 'text-accent-red'
                        : remaining < (budget * 0.1)
                            ? 'text-accent-yellow'
                            : 'text-accent-green'
                        }`}>
                        {budget <= 0
                            ? 'Please set your monthly budget in settings'
                            : remaining < 0
                                ? 'You have exceeded your budget'
                                : remaining < (budget * 0.1)
                                    ? 'Your budget is running low'
                                    : 'Your budget is on track'}
                    </p>
                </div>
            </div>
        </Card>
    );
};

export default BudgetSummary; 