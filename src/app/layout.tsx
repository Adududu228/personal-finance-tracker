import '../styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FinanceProvider } from '@/contexts/FinanceContext';
import Navbar from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Finance Tracker',
    description: 'A personal finance tracker application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-gradient-to-b from-dark-900 to-dark-800 text-white min-h-screen`}>
                <FinanceProvider>
                    <div className="min-h-screen">
                        <Navbar />
                        <main className="max-w-7xl mx-auto py-6 pb-24 sm:pb-6 sm:px-6 lg:px-8 px-4">
                            {children}
                        </main>
                    </div>
                </FinanceProvider>
            </body>
        </html>
    );
} 