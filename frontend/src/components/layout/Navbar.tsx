'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navigation = [
        { name: 'Add Transaction', href: '/', icon: '💸' },
        { name: 'Dashboard', href: '/dashboard', icon: '📊' },
        { name: 'Recurring', href: '/recurring', icon: '🔄' },
        { name: 'Settings', href: '/settings', icon: '⚙️' },
    ];

    const isActive = (path: string) => pathname === path;

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="bg-dark-800 shadow-dark-md sticky top-0 z-10 border-b border-dark-700 hidden sm:block">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <Link href="/" className="flex items-center">
                                    <span className="text-2xl mr-2">💰</span>
                                    <span className="font-bold text-xl bg-gradient-to-r from-accent-blue to-accent-indigo bg-clip-text text-transparent">
                                        FinanceTracker
                                    </span>
                                </Link>
                            </div>
                            <div className="ml-6 flex space-x-6">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`${isActive(item.href)
                                            ? 'border-accent-blue text-accent-blue bg-dark-900/70'
                                            : 'border-transparent text-gray-300 hover:border-gray-500 hover:text-white hover:bg-dark-700'
                                            } flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors duration-150`}
                                    >
                                        <span className="mr-1.5">{item.icon}</span>
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Header */}
            <nav className="bg-dark-800 shadow-dark-md sticky top-0 z-10 border-b border-dark-700 block sm:hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-center h-14">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl mr-2">💰</span>
                                <span className="font-bold text-xl bg-gradient-to-r from-accent-blue to-accent-indigo bg-clip-text text-transparent">
                                    FinanceTracker
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 shadow-dark-lg z-50">
                <div className="grid grid-cols-4 h-16">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex flex-col items-center justify-center ${isActive(item.href)
                                ? 'text-accent-blue'
                                : 'text-gray-400 hover:text-gray-200'
                                }`}
                        >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-xs mt-1">{item.name.split(' ')[0]}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}