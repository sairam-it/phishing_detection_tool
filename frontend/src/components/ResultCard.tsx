import React from 'react';
import { Shield, ShieldAlert, ShieldX, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { URLScanResult } from '../types';

interface ResultCardProps {
  result: URLScanResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getVerdictConfig = (verdict: string) => {
    switch (verdict) {
      case 'safe':
        return {
          icon: Shield,
          color: 'text-success-600 dark:text-success-400',
          bgColor: 'bg-success-50 dark:bg-success-900/20',
          borderColor: 'border-success-200 dark:border-success-800',
          title: 'Safe',
          description: 'This URL appears to be legitimate and safe to visit.'
        };
      case 'suspicious':
        return {
          icon: ShieldAlert,
          color: 'text-warning-600 dark:text-warning-400',
          bgColor: 'bg-warning-50 dark:bg-warning-900/20',
          borderColor: 'border-warning-200 dark:border-warning-800',
          title: 'Suspicious',
          description: 'This URL has some concerning characteristics. Proceed with caution.'
        };
      case 'malicious':
        return {
          icon: ShieldX,
          color: 'text-danger-600 dark:text-danger-400',
          bgColor: 'bg-danger-50 dark:bg-danger-900/20',
          borderColor: 'border-danger-200 dark:border-danger-800',
          title: 'Malicious',
          description: 'This URL is likely dangerous. Do not visit this site.'
        };
      default:
        return {
          icon: AlertTriangle,
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-800',
          title: 'Unknown',
          description: 'Unable to determine the safety of this URL.'
        };
    }
  };

  const config = getVerdictConfig(result.verdict);
  const IconComponent = config.icon;

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-danger-600 dark:text-danger-400';
    if (score >= 30) return 'text-warning-600 dark:text-warning-400';
    return 'text-success-600 dark:text-success-400';
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 70) return 'bg-danger-500';
    if (score >= 30) return 'bg-warning-500';
    return 'bg-success-500';
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className={`rounded-2xl border-2 ${config.borderColor} ${config.bgColor} p-6 shadow-xl`}>
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className={`p-3 rounded-full ${config.bgColor} ${config.borderColor} border`}>
            <IconComponent className={`h-8 w-8 ${config.color}`} />
          </div>
          <div className="flex-1">
            <h3 className={`text-2xl font-bold ${config.color}`}>
              {config.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {config.description}
            </p>
          </div>
        </div>

        {/* URL Display */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Scanned URL
          </label>
          <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg border">
            <code className="text-sm text-gray-800 dark:text-gray-200 break-all">
              {result.url}
            </code>
          </div>
        </div>

        {/* Threat Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Threat Score
            </label>
            <span className={`text-lg font-bold ${getScoreColor(result.score)}`}>
              {result.score}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out ${getScoreBarColor(result.score)}`}
              style={{ width: `${Math.min(result.score, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Safe (0-29)</span>
            <span>Suspicious (30-69)</span>
            <span>Malicious (70+)</span>
          </div>
        </div>

        {/* Reasons */}
        {result.reasons.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Detection Reasons
            </label>
            <div className="space-y-2">
              {result.reasons.map((reason, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <AlertTriangle className="h-4 w-4 text-warning-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {reason}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Safe URL - No reasons */}
        {result.reasons.length === 0 && result.verdict === 'safe' && (
          <div className="flex items-center space-x-3 p-4 bg-success-50 dark:bg-success-900/20 rounded-lg border border-success-200 dark:border-success-800">
            <CheckCircle className="h-5 w-5 text-success-500 flex-shrink-0" />
            <span className="text-sm text-success-700 dark:text-success-300">
              No suspicious characteristics detected in this URL.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};