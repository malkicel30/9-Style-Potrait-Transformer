
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, InfoIcon, XIcon } from './Icons';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onDismiss: () => void;
}

const ICONS: Record<ToastType, React.ReactNode> = {
  success: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
  error: <XCircleIcon className="w-6 h-6 text-red-500" />,
  info: <InfoIcon className="w-6 h-6 text-blue-500" />,
};

export const Toaster: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="fixed bottom-0 right-0 p-4 sm:p-6 space-y-3 z-50 w-full max-w-sm"
      aria-live="assertive"
    >
      {children}
    </div>
  );
};

export const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onDismiss, 300); // Match animation duration
      return () => clearTimeout(exitTimer);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  const handleDismiss = () => {
      setIsExiting(true);
      setTimeout(onDismiss, 300);
  }

  return (
    <div
      className={`w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 flex items-start p-4 space-x-3 transition-transform duration-300 ${isExiting ? 'animate-toast-out' : 'animate-toast-in'}`}
      role="alert"
    >
      <div className="flex-shrink-0">{ICONS[type]}</div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{message}</p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={handleDismiss}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-800"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
