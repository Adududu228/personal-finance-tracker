// Define transaction types
export type TransactionType = 'income' | 'expense';

// Define frequency types for recurring expenses
export type FrequencyType = 'monthly' | 'weekly' | 'biweekly' | 'weekdays' | 'daily';

// Transaction model
export interface Transaction {
    id: string;
    date: string; // ISO date string
    amount: number;
    type: TransactionType;
    category?: string;
    note?: string;
}

// Recurring expense model
export interface RecurringExpense {
    id: string;
    amount: number;
    category: string;
    frequency: FrequencyType;
    startDate?: string; // ISO date string
    isActive: boolean;
    title: string;
}

// User settings
export interface UserSettings {
    monthlyBudget: number;
    categories: string[];
    currency?: string;
    colorTheme?: 'dark' | 'light' | 'blue' | 'purple';
    notifications?: boolean;
} 