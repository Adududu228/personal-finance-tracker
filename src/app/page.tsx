'use client';

import React from 'react';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';

export default function Home() {
    return (
        <div className="space-y-6 px-2 sm:px-0">
            <div className="md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
                        Add Transaction
                    </h2>
                    <p className="mt-1 text-sm text-gray-400">
                        Record your income and expenses to track your financial activity
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                    <TransactionForm />
                </div>
                <div className="lg:col-span-3">
                    <TransactionList />
                </div>
            </div>
        </div>
    );
} 