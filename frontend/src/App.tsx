import React, { useState } from 'react';
import { Header } from './components/Header';
import { URLInput } from './components/URLInput';
import { ResultCard } from './components/ResultCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { scanURL } from './services/api';
import { useDarkMode } from './hooks/useDarkMode';
import type { ScanResult } from './types/api';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [result, setResult] = useState<ScanResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScanURL = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const scanResult = await scanURL(url);
      setResult(scanResult);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      <Header isDark={isDark} toggleDarkMode={toggleDarkMode} />
      
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Safe Online
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our advanced phishing detection system analyzes URLs to protect you from malicious websites and scams.
            </p>
          </div>

          {/* Input Section */}
          <div className="mb-12">
            <URLInput 
              onSubmit={handleScanURL} 
              isLoading={isLoading} 
              error={error}
            />
          </div>

          {/* Results Section */}
          <div className="space-y-8">
            {isLoading && <LoadingSpinner />}
            
            {result && !isLoading && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Scan Results
                </h3>
                <ResultCard result={result} />
              </div>
            )}
          </div>

          {/* Instructions */}
          {!result && !isLoading && (
            <div className="mt-16 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  How it works
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">1</span>
                    </div>
                    <p className="font-medium">Enter URL</p>
                    <p>Paste any suspicious URL you want to check</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">2</span>
                    </div>
                    <p className="font-medium">AI Analysis</p>
                    <p>Our system analyzes multiple risk factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-blue-600 dark:text-blue-400 font-semibold">3</span>
                    </div>
                    <p className="font-medium">Get Results</p>
                    <p>Receive a detailed safety assessment</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;