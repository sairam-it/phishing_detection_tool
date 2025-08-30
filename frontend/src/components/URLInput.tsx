import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  error: string | null;
}

export function URLInput({ onSubmit, isLoading, error }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [inputError, setInputError] = useState('');

  const validateURL = (input: string): boolean => {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      setInputError('Please enter a URL');
      return;
    }

    if (!validateURL(url)) {
      setInputError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    setInputError('');
    onSubmit(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (inputError) setInputError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL to scan (e.g., https://example.com)"
            className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        {(inputError || error) && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>{inputError || error}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:hover:transform-none transition-all duration-200 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Scanning URL...</span>
            </div>
          ) : (
            'Scan URL'
          )}
        </button>
      </form>
    </div>
  );
}