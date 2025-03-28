'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { useTransactions } from '@/hooks/useTransactions';

export default function CategoryBreakdown() {
    const { transactions } = useTransactions();

    // Calculate total spending
    const totalSpending = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    // Group transactions by category and calculate total for each
    const categories = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, transaction) => {
            const category = transaction.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category] += transaction.amount;
            return acc;
        }, {} as Record<string, number>);

    // Convert to array and sort by amount (descending)
    const sortedCategories = Object.entries(categories)
        .map(([name, amount]) => ({
            name,
            amount,
            percentage: (amount / totalSpending) * 100
        }))
        .sort((a, b) => b.amount - a.amount);

    // Define colors for different categories
    const categoryColors: Record<string, string> = {
        Food: 'bg-orange-500',
        Housing: 'bg-blue-500',
        Transportation: 'bg-green-500',
        Entertainment: 'bg-purple-500',
        Shopping: 'bg-pink-500',
        Utilities: 'bg-yellow-500',
        Healthcare: 'bg-red-500',
        Insurance: 'bg-indigo-500',
        Debt: 'bg-gray-500',
        Savings: 'bg-teal-500',
        Other: 'bg-zinc-500',
    };

    return (
        <Card title="Spending by Category">
            {sortedCategories.length === 0 ? (
                <div className="flex items-center justify-center h-40">
                    <p className="text-gray-400">No expense transactions to display</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Pie chart visualization */}
                    <div className="relative h-48 mx-auto w-48 sm:w-56 sm:h-56 md:w-64 md:h-64">
                        <div className="absolute inset-0 rounded-full overflow-hidden">
                            {sortedCategories.map((category, index, array) => {
                                // Calculate the start and end angles for this segment
                                const totalPercent = array.slice(0, index).reduce((sum, i) => sum + i.percentage, 0);
                                const startPercent = totalPercent;
                                const endPercent = startPercent + category.percentage;

                                return (
                                    <div
                                        key={category.name}
                                        className={`absolute ${categoryColors[category.name] || 'bg-gray-500'}`}
                                        style={{
                                            top: '0',
                                            left: '0',
                                            width: '100%',
                                            height: '100%',
                                            clipPath: `polygon(50% 50%, ${50 + 50 * Math.cos(2 * Math.PI * startPercent / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * startPercent / 100)}%, ${50 + 50 * Math.cos(2 * Math.PI * endPercent / 100)}% ${50 + 50 * Math.sin(2 * Math.PI * endPercent / 100)}%, 50% 50%)`
                                        }}
                                    />
                                );
                            })}
                            <div className="absolute inset-[15%] bg-background-dark rounded-full flex items-center justify-center">
                                <span className="text-lg font-semibold text-white">${totalSpending.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pr-1">
                        {sortedCategories.map((category) => (
                            <div
                                key={category.name}
                                className="flex items-center p-2 rounded-lg hover:bg-background-card/50 transition-colors"
                            >
                                <div
                                    className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${categoryColors[category.name] || 'bg-gray-500'}`}
                                />
                                <div className="min-w-0 flex-1">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium text-sm truncate">{category.name}</span>
                                        <span className="text-xs text-gray-400 ml-1">{category.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="text-sm text-white">${category.amount.toFixed(2)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </Card>
    );
} 