import React from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle, ExternalLink } from 'lucide-react';
import type { ScanResult } from '../types/api';

interface ResultCardProps {
  result: ScanResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'safe':
        return {
          icon: CheckCircle,
          bg: 'bg-green-50 dark:bg-green-900/20',
          border: 'border-green-200 dark:border-green-800',
          iconColor: 'text-green-600 dark:text-green-400',
          titleColor: 'text-green-800 dark:text-green-300',
          title: 'Safe URL'
        };
      case 'suspicious':
        return {
          icon: AlertTriangle,
          bg: 'bg-yellow-50 dark:bg-yellow-900/20',
          border: 'border-yellow-200 dark:border-yellow-800',
          iconColor: 'text-yellow-600 dark:text-yellow-400',
          titleColor: 'text-yellow-800 dark:text-yellow-300',
          title: 'Suspicious URL'
        };
      case 'malicious':
        return {
          icon: XCircle,
          bg: 'bg-red-50 dark:bg-red-900/20',
          border: 'border-red-200 dark:border-red-800',
          iconColor: 'text-red-600 dark:text-red-400',
          titleColor: 'text-red-800 dark:text-red-300',
          title: 'Malicious URL'
        };
      default:
        return {
          icon: Shield,
          bg: 'bg-gray-50 dark:bg-gray-800',
          border: 'border-gray-200 dark:border-gray-700',
          iconColor: 'text-gray-600 dark:text-gray-400',
          titleColor: 'text-gray-800 dark:text-gray-300',
          title: 'Unknown'
        };
    }
  };

  const config = getVerdictConfig(result.verdict);
  const IconComponent = config.icon;

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className={`${config.bg} ${config.border} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300`}>
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
          <h3 className={`text-xl font-semibold ${config.titleColor}`}>
            {config.title}
          </h3>
          <div className={`ml-auto px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.titleColor}`}>
            Score: {result.score}
          </div>
        </div>

        {/* URL */}
        <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
              {result.url}
            </span>
          </div>
        </div>

        {/* Reasons */}
        {result.reasons.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Detection Reasons:
            </h4>
            <ul className="space-y-1">
              {result.reasons.map((reason, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="w-1 h-1 bg-gray-400 dark:bg-gray-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Safe message */}
        {result.reasons.length === 0 && result.verdict === 'safe' && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            No suspicious indicators detected. This URL appears to be safe.
          </div>
        )}
      </div>
    </div>
  );
}