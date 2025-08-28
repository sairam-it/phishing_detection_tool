import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { URLInput } from './components/URLInput';
import { ResultCard } from './components/ResultCard';
import { ErrorMessage } from './components/ErrorMessage';
import { scanURL } from './services/api';
import { URLScanResult } from './types';

function App() {
  const [result, setResult] = useState<URLScanResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (url: string) => {
    setIsLoading(true);
    setError('');
    setResult(null);

    try {
      const scanResult = await scanURL(url);
      setResult(scanResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError('');
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Detect <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">Phishing</span> URLs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Protect yourself from malicious websites with our advanced AI-powered URL analysis system. 
            Get instant threat assessments and detailed security reports.
          </p>
        </div>

        {/* Scanning Interface */}
        <div className="space-y-8">
          <URLInput onScan={handleScan} isLoading={isLoading} />
          
          {/* Loading State */}
          {isLoading && (
            <div className="w-full max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl cyber-border p-8 text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-cyber-500 to-cyber-600 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 mx-auto border-4 border-cyber-200 dark:border-cyber-800 rounded-full animate-spin border-t-cyber-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Analyzing URL Security
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our AI is scanning for threats, malicious patterns, and security risks...
                </p>
                <div className="mt-6 relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="scan-line absolute inset-0 h-full" />
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {result && <ResultCard result={result} />}
          
          {/* Error State */}
          {error && <ErrorMessage message={error} onRetry={handleRetry} />}
        </div>

        {/* Features Section */}
        {!result && !error && !isLoading && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Advanced Security Features
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our comprehensive analysis checks multiple threat indicators
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl cyber-border">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Domain Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Checks domain reputation, age, and suspicious patterns
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl cyber-border">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">SSL Verification</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Validates HTTPS usage and certificate authenticity
                </p>
              </div>
              
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl cyber-border">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Threat Intelligence</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cross-references with known phishing databases
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;