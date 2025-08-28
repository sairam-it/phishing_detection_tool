import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="rounded-2xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-6 shadow-xl">
        <div className="flex items-start space-x-4">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
              Error Occurred
            </h3>
            <p className="text-red-700 dark:text-red-300 mb-4">
              {message}
            </p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Try Again</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};