import { Transaction } from './types';

interface CategoryBreakdown {
    breakdown: { [key: string]: number };
    total: number;
}

export function calculateCategoryBreakdown(transactions: Transaction[]): CategoryBreakdown {
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    
    const breakdown = expenseTransactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Other';
        acc[category] = (acc[category] || 0) + transaction.amount;
        return acc;
    }, {} as { [key: string]: number });

    const total = Object.values(breakdown).reduce((sum, amount) => sum + amount, 0);

    return { breakdown, total };
} 