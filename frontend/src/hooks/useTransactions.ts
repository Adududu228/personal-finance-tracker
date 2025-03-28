import { useFinance } from '@/contexts/FinanceContext';

export function useTransactions() {
    const { transactions } = useFinance();

    return {
        transactions
    };
} 