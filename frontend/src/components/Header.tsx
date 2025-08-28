import React from 'react';
import { Shield, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden bg-white dark:bg-gray-900 cyber-border border-b">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-cyber-grid bg-cyber-grid opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-cyber-500 to-cyber-600 rounded-xl shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-600 to-cyber-800 dark:from-cyber-400 dark:to-cyber-600 bg-clip-text text-transparent">
                PhishGuard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Advanced URL Threat Detection System
              </p>
            </div>
          </div>
          
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};