import { useFinance } from '@/contexts/FinanceContext';

export function useSettings() {
    const { userSettings, updateUserSettings } = useFinance();

    return {
        settings: userSettings,
        updateSettings: updateUserSettings
    };
} 