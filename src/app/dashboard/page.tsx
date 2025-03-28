'use client';

import React from 'react';
import BudgetSummary from '@/components/dashboard/BudgetSummary';
import CategoryBreakdown from '@/components/dashboard/CategoryBreakdown';
import TransactionList from '@/components/dashboard/TransactionList';

export default function DashboardPage() {
    return (
        <div className="space-y-6 px-2 sm:px-0">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Dashboard
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Overview of your financial status
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <BudgetSummary />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <CategoryBreakdown />
                    <TransactionList />
                </div>
            </div>
        </div>
    );
} 