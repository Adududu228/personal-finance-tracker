'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, RecurringExpense, UserSettings } from '@/lib/types';
import * as storage from '@/lib/storage';
import { generateId } from '@/lib/utils';

interface FinanceContextType {
    // Transactions
    transactions: Transaction[];
    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    deleteTransaction: (id: string) => void;

    // Recurring expenses
    recurringExpenses: RecurringExpense[];
    addRecurringExpense: (expense: Omit<RecurringExpense, 'id'>) => void;
    updateRecurringExpense: (expense: RecurringExpense) => void;
    deleteRecurringExpense: (id: string) => void;
    toggleRecurringExpense: (id: string) => void;

    // User settings
    userSettings: UserSettings;
    updateUserSettings: (settings: Partial<UserSettings>) => void;
    budget: number;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [recurringExpenses, setRecurringExpenses] = useState<RecurringExpense[]>([]);
    const [userSettings, setUserSettings] = useState<UserSettings>({
        monthlyBudget: 3000,
        categories: [],
    });
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize data from localStorage
    useEffect(() => {
        // Only run once on client side
        if (typeof window !== 'undefined' && !isInitialized) {
            setTransactions(storage.getTransactions());
            setRecurringExpenses(storage.getRecurringExpenses());
            setUserSettings(storage.getUserSettings());
            setIsInitialized(true);
        }
    }, [isInitialized]);

    // Add a new transaction
    const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
        const newTransaction: Transaction = {
            ...transactionData,
            id: generateId(),
            date: new Date().toISOString(),
        };

        const updatedTransactions = storage.addTransaction(newTransaction);
        setTransactions(updatedTransactions);
    };

    // Delete a transaction
    const deleteTransaction = (id: string) => {
        const updatedTransactions = storage.deleteTransaction(id);
        setTransactions(updatedTransactions);
    };

    // Add a recurring expense
    const addRecurringExpense = (expenseData: Omit<RecurringExpense, 'id'>) => {
        const newExpense: RecurringExpense = {
            ...expenseData,
            id: generateId(),
        };

        const updatedExpenses = storage.addRecurringExpense(newExpense);
        setRecurringExpenses(updatedExpenses);
    };

    // Update a recurring expense
    const updateRecurringExpense = (expense: RecurringExpense) => {
        const updatedExpenses = storage.updateRecurringExpense(expense);
        setRecurringExpenses(updatedExpenses);
    };

    // Delete a recurring expense
    const deleteRecurringExpense = (id: string) => {
        const updatedExpenses = storage.deleteRecurringExpense(id);
        setRecurringExpenses(updatedExpenses);
    };

    // Toggle a recurring expense active state
    const toggleRecurringExpense = (id: string) => {
        const expense = recurringExpenses.find(exp => exp.id === id);
        if (expense) {
            const updatedExpense = {
                ...expense,
                isActive: !expense.isActive
            };
            updateRecurringExpense(updatedExpense);
        }
    };

    // Update user settings
    const updateSettings = (settings: Partial<UserSettings>) => {
        const updatedSettings = storage.updateUserSettings(settings);
        setUserSettings(updatedSettings);
    };

    const value = {
        transactions,
        addTransaction,
        deleteTransaction,
        recurringExpenses,
        addRecurringExpense,
        updateRecurringExpense,
        deleteRecurringExpense,
        toggleRecurringExpense,
        userSettings,
        updateUserSettings: updateSettings,
        budget: userSettings.monthlyBudget,
    };

    return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
    const context = useContext(FinanceContext);
    if (context === undefined) {
        throw new Error('useFinance must be used within a FinanceProvider');
    }
    return context;
} 