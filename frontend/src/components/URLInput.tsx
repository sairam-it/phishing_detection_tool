import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, Loader2 } from 'lucide-react';
import { isValidURL } from '../services/api';

interface URLInputProps {
  onScan: (url: string) => void;
  isLoading: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onScan, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidURL(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }

    onScan(url.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Shield className="h-5 w-5 text-cyber-500 dark:text-cyber-400" />
          </div>
          
          <input
            type="text"
            value={url}
            onChange={handleInputChange}
            placeholder="Enter URL to scan (e.g., https://example.com)"
            className={`
              w-full pl-12 pr-4 py-4 text-lg rounded-xl
              bg-white dark:bg-gray-800 
              cyber-border
              focus:ring-2 focus:ring-cyber-500 focus:border-cyber-500
              placeholder-gray-400 dark:placeholder-gray-500
              transition-all duration-300
              ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
            `}
            disabled={isLoading}
          />
          
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <Loader2 className="h-5 w-5 text-cyber-500 animate-spin" />
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className={`
            w-full py-4 px-6 rounded-xl font-semibold text-lg
            bg-gradient-to-r from-cyber-500 to-cyber-600
            hover:from-cyber-600 hover:to-cyber-700
            text-white shadow-lg hover:shadow-xl
            transform hover:scale-[1.02] active:scale-[0.98]
            transition-all duration-300
            disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
            flex items-center justify-center space-x-2
            cyber-glow
          `}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Scanning URL...</span>
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              <span>Scan URL for Threats</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};