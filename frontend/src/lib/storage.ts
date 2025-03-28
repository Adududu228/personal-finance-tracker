import { Transaction, RecurringExpense, UserSettings } from './types';
import { DEFAULT_CATEGORIES } from './utils';

// LocalStorage keys
const TRANSACTIONS_KEY = 'finance_tracker_transactions';
const RECURRING_EXPENSES_KEY = 'finance_tracker_recurring_expenses';
const USER_SETTINGS_KEY = 'finance_tracker_user_settings';

// Default user settings
const DEFAULT_USER_SETTINGS: UserSettings = {
    monthlyBudget: 3000,
    categories: DEFAULT_CATEGORIES,
    currency: 'USD',
    colorTheme: 'dark',
    notifications: true,
};

// Get transactions from localStorage
export function getTransactions(): Transaction[] {
    if (typeof window !== 'undefined') {
        const storedTransactions = localStorage.getItem(TRANSACTIONS_KEY);
        return storedTransactions ? JSON.parse(storedTransactions) : [];
    }
    return [];
}

// Save transactions to localStorage
export function saveTransactions(transactions: Transaction[]): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    }
}

// Add a new transaction
export function addTransaction(transaction: Transaction): Transaction[] {
    const transactions = getTransactions();
    const updatedTransactions = [...transactions, transaction];
    saveTransactions(updatedTransactions);
    return updatedTransactions;
}

// Delete a transaction
export function deleteTransaction(id: string): Transaction[] {
    const transactions = getTransactions();
    const updatedTransactions = transactions.filter(
        (transaction) => transaction.id !== id
    );
    saveTransactions(updatedTransactions);
    return updatedTransactions;
}

// Get recurring expenses from localStorage
export function getRecurringExpenses(): RecurringExpense[] {
    if (typeof window !== 'undefined') {
        const storedExpenses = localStorage.getItem(RECURRING_EXPENSES_KEY);
        return storedExpenses ? JSON.parse(storedExpenses) : [];
    }
    return [];
}

// Save recurring expenses to localStorage
export function saveRecurringExpenses(expenses: RecurringExpense[]): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(RECURRING_EXPENSES_KEY, JSON.stringify(expenses));
    }
}

// Add a new recurring expense
export function addRecurringExpense(expense: RecurringExpense): RecurringExpense[] {
    const expenses = getRecurringExpenses();
    const updatedExpenses = [...expenses, expense];
    saveRecurringExpenses(updatedExpenses);
    return updatedExpenses;
}

// Update a recurring expense
export function updateRecurringExpense(updatedExpense: RecurringExpense): RecurringExpense[] {
    const expenses = getRecurringExpenses();
    const updatedExpenses = expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
    );
    saveRecurringExpenses(updatedExpenses);
    return updatedExpenses;
}

// Delete a recurring expense
export function deleteRecurringExpense(id: string): RecurringExpense[] {
    const expenses = getRecurringExpenses();
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    saveRecurringExpenses(updatedExpenses);
    return updatedExpenses;
}

// Get user settings from localStorage
export function getUserSettings(): UserSettings {
    if (typeof window !== 'undefined') {
        const storedSettings = localStorage.getItem(USER_SETTINGS_KEY);
        return storedSettings
            ? JSON.parse(storedSettings)
            : DEFAULT_USER_SETTINGS;
    }
    return DEFAULT_USER_SETTINGS;
}

// Save user settings to localStorage
export function saveUserSettings(settings: UserSettings): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_SETTINGS_KEY, JSON.stringify(settings));
    }
}

// Update user settings
export function updateUserSettings(settings: Partial<UserSettings>): UserSettings {
    const currentSettings = getUserSettings();
    const updatedSettings = { ...currentSettings, ...settings };
    saveUserSettings(updatedSettings);
    return updatedSettings;
} 