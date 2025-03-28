import { Transaction, RecurringExpense } from './types';
import { format, getDaysInMonth, getDay, addDays, startOfMonth, endOfMonth, eachWeekOfInterval, isSaturday } from 'date-fns';

// Generate a unique ID
export function generateId(): string {
    return Math.random().toString(36).substring(2, 11);
}

// Format currency
export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

// Calculate total income in current month
export function calculateMonthlyIncome(transactions: Transaction[]): number {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transaction.type === 'income' &&
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear;
        })
        .reduce((total, transaction) => total + transaction.amount, 0);
}

// Calculate total spent in current month
export function calculateMonthlySpent(transactions: Transaction[]): number {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
        .filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transaction.type === 'expense' &&
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear;
        })
        .reduce((total, transaction) => total + transaction.amount, 0);
}

// Calculate total recurring expenses with proper frequency handling
export function calculateRecurringExpenses(recurringExpenses: RecurringExpense[]): number {
    const now = new Date();
    const daysInCurrentMonth = getDaysInMonth(now);
    const dayOfWeek = getDay(now); // 0-6, 0 is Sunday, 6 is Saturday

    // Count Saturdays in current month for weekly expenses
    const saturdays = countSaturdaysInMonth(now);

    // Count weekdays (Mon-Fri) in current month
    const weekdaysInMonth = countWeekdaysInMonth(now);

    return recurringExpenses
        .filter(expense => expense.isActive)
        .reduce((total, expense) => {
            switch (expense.frequency) {
                case 'daily':
                    // Daily = amount × days in month
                    return total + (expense.amount * daysInCurrentMonth);

                case 'weekdays':
                    // Weekdays = amount × weekdays in month (mon-fri)
                    return total + (expense.amount * weekdaysInMonth);

                case 'weekly':
                    // Weekly = amount × number of Saturdays in month
                    return total + (expense.amount * saturdays);

                case 'biweekly':
                    // Bi-weekly = amount × (number of Saturdays / 2), rounded up
                    return total + (expense.amount * Math.ceil(saturdays / 2));

                case 'monthly':
                default:
                    // Monthly = just the amount
                    return total + expense.amount;
            }
        }, 0);
}

// Count the number of Saturdays in the current month
function countSaturdaysInMonth(date: Date): number {
    const start = startOfMonth(date);
    const end = endOfMonth(date);

    // Get all weeks in the month
    const weeks = eachWeekOfInterval({ start, end });

    // Count Saturdays in those weeks
    return weeks.filter((weekStart: Date) => {
        // For each week, check if the Saturday of that week falls within the month
        const saturday = addDays(weekStart, 6); // add 6 days to get to Saturday
        return saturday >= start && saturday <= end;
    }).length;
}

// Count the number of weekdays (Mon-Fri) in the current month
function countWeekdaysInMonth(date: Date): number {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    let count = 0;
    let current = start;

    while (current <= end) {
        const dayOfWeek = getDay(current);
        // If day is 1-5 (Mon-Fri), increment counter
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            count++;
        }
        // Move to next day
        current = addDays(current, 1);
    }

    return count;
}

// Group transactions by category
export function groupByCategory(transactions: Transaction[]): Record<string, number> {
    return transactions.reduce((acc, transaction) => {
        const category = transaction.category || 'Uncategorized';
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += transaction.amount;
        return acc;
    }, {} as Record<string, number>);
}

// Calculate remaining budget
export function calculateRemainingBudget(
    monthlyBudget: number,
    totalSpent: number,
    recurringExpenses: number
): number {
    return monthlyBudget - totalSpent - recurringExpenses;
}

// Default categories
export const DEFAULT_CATEGORIES = [
    'Housing',
    'Transportation',
    'Food',
    'Utilities',
    'Healthcare',
    'Entertainment',
    'Shopping',
    'Personal Care',
    'Education',
    'Travel',
    'Debt',
    'Savings',
    'Gifts',
    'Other'
];

// Format date for display
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    });
}; 