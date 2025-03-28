import React, { useMemo } from 'react';
import Card from './ui/Card';
import { Transaction } from '@/lib/types';
import { calculateCategoryBreakdown } from '@/lib/calculations';

interface CategoryBreakdownProps {
    transactions: Transaction[];
}

export default function CategoryBreakdown({ transactions }: CategoryBreakdownProps) {
    // Calculate category breakdown
    const { breakdown, total } = useMemo(() => {
        return calculateCategoryBreakdown(transactions);
    }, [transactions]);

    // Sort categories by amount (descending)
    const sortedCategories = useMemo(() => {
        return Object.entries(breakdown)
            .sort((a, b) => b[1] - a[1])
            .map(([category, amount]) => ({
                category,
                amount,
                percentage: (amount / total) * 100,
            }));
    }, [breakdown, total]);

    // Define colors for different categories
    const categoryColors: { [key: string]: string } = {
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

    if (sortedCategories.length === 0) {
        return (
            <Card title="Spending by Category">
                <div className="flex items-center justify-center h-40">
                    <p className="text-gray-400">No transactions to display</p>
                </div>
            </Card>
        );
    }

    return (
        <Card title="Spending by Category">
            <div className="space-y-6">
                {/* Pie chart visualization */}
                <div className="relative h-40 w-40 xs:h-48 xs:w-48 sm:h-56 sm:w-56 mx-auto">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        {sortedCategories.map((item, index, array) => {
                            // Calculate the start and end angles for this segment
                            const totalPercent = array.slice(0, index).reduce((sum, i) => sum + i.percentage, 0);
                            const startPercent = totalPercent;
                            const endPercent = startPercent + item.percentage;

                            return (
                                <div
                                    key={item.category}
                                    className={`absolute ${categoryColors[item.category] || 'bg-gray-500'}`}
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
                            <span className="text-sm xs:text-base sm:text-lg font-semibold text-white">${total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 max-h-[300px] overflow-y-auto pr-1">
                    {sortedCategories.map((item) => (
                        <div
                            key={item.category}
                            className="flex items-center p-2 rounded-lg hover:bg-background-card/50 transition-colors"
                        >
                            <div
                                className={`w-3 h-3 xs:w-4 xs:h-4 rounded-full mr-2 flex-shrink-0 ${categoryColors[item.category] || 'bg-gray-500'}`}
                            />
                            <div className="min-w-0 flex-1">
                                <div className="flex justify-between items-center">
                                    <span className="font-medium text-xs xs:text-sm truncate">{item.category}</span>
                                    <span className="text-xs text-gray-400 ml-1">{item.percentage.toFixed(1)}%</span>
                                </div>
                                <div className="text-xs xs:text-sm text-white">${item.amount.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
} 