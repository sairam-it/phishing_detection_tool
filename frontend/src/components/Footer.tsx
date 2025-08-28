import React from 'react';
import { Github, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 cyber-border border-t mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <Shield className="h-5 w-5 text-cyber-500" />
            <span className="text-sm">
              Built with <Heart className="h-4 w-4 text-red-500 inline mx-1" /> for cybersecurity
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-cyber-600 dark:hover:text-cyber-400 transition-colors duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              © 2025 PhishGuard. Protecting the web.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};