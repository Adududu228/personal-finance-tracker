'use client';

import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { useFinance } from '@/contexts/FinanceContext';
import { formatCurrency, formatDate } from '@/lib/utils';

const TransactionList = () => {
    const { transactions, deleteTransaction } = useFinance();
    const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

    // Sort transactions by date (most recent first)
    const sortedTransactions = [...transactions]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 10); // Limit to the 10 most recent transactions

    // Get the category color based on category name
    const getCategoryColor = (category: string | undefined) => {
        if (!category) return 'bg-gray-500';

        const colors: Record<string, string> = {
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
            other: 'bg-gray-500',
        };

        return colors[category.toLowerCase()] || 'bg-gray-500';
    };

    const getTypeColor = (type: string) => {
        return type === 'expense' ? 'text-accent-red' : 'text-accent-green';
    };

    const handleDelete = (id: string) => {
        if (confirmDelete === id) {
            deleteTransaction(id);
            setConfirmDelete(null);
        } else {
            setConfirmDelete(id);
        }
    };

    return (
        <Card title="Recent Transactions">
            <div className="p-4">
                {sortedTransactions.length === 0 ? (
                    <div className="text-center py-8">
                        <p className="text-gray-400">No transactions to display</p>
                        <p className="text-sm text-gray-500 mt-2">Add transactions to see them here</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {sortedTransactions.map((transaction) => (
                            <div
                                key={transaction.id}
                                className="flex items-center justify-between p-3 bg-dark-800/50 rounded-lg border border-dark-700 hover:bg-dark-700/70 transition-colors"
                            >
                                <div className="flex items-center">
                                    <div className="hidden sm:block mr-3">
                                        <div className={`w-3 h-10 ${getCategoryColor(transaction.category)} rounded-l-full`}></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center">
                                            <span className="text-white font-medium">{transaction.note || 'No description'}</span>
                                            <span className={`ml-2 text-xs uppercase font-medium rounded-full px-2 py-0.5 ${transaction.type === 'expense' ? 'bg-accent-red/20 text-accent-red' : 'bg-accent-green/20 text-accent-green'}`}>
                                                {transaction.type}
                                            </span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-400 mt-1">
                                            <span>{formatDate(transaction.date)}</span>
                                            <span className="mx-2">•</span>
                                            <span className="capitalize">{transaction.category || 'Uncategorized'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className={`font-semibold ${getTypeColor(transaction.type)}`}>
                                        {transaction.type === 'expense' ? '-' : '+'}{formatCurrency(transaction.amount)}
                                    </span>
                                    <Button
                                        variant={confirmDelete === transaction.id ? "danger" : "ghost"}
                                        size="sm"
                                        className="ml-3"
                                        onClick={() => handleDelete(transaction.id)}
                                    >
                                        {confirmDelete === transaction.id ? 'Confirm' : 'Delete'}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    );
};

export default TransactionList; 