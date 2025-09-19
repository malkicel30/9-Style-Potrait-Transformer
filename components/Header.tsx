
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon, XCircleIcon, SparklesIcon } from './Icons';

interface HeaderProps {
  onClear: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClear }) => {
  const [theme, toggleTheme] = useTheme();

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-8 h-8 text-brand-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              9-Style Portrait Transformer
            </h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onClear}
              className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              aria-label="Clear session"
            >
              <XCircleIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Clear</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
