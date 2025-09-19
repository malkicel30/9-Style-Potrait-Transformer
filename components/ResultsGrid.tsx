
import React from 'react';
import { GenerationResult } from '../types';
import { ResultTile } from './ResultTile';
import { DownloadIcon, RefreshCwIcon } from './Icons';

interface ResultsGridProps {
  results: GenerationResult[];
  isGenerating: boolean;
  onRegenerate: (key: string) => void;
  onRegenerateAll: () => void;
  onDownloadAll: () => void;
  onCopyPrompt: (prompt: string) => void;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({
  results,
  isGenerating,
  onRegenerate,
  onRegenerateAll,
  onDownloadAll,
  onCopyPrompt,
}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-0">
          Generated Styles
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={onRegenerateAll}
            disabled={isGenerating}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-900"
          >
            <RefreshCwIcon className="w-4 h-4" />
            <span>Regenerate All</span>
          </button>
          <button
            onClick={onDownloadAll}
            disabled={isGenerating || results.every(r => r.status !== 'success')}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-900"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>Download All (ZIP)</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <ResultTile
            key={result.key}
            result={result}
            onRegenerate={onRegenerate}
            onCopyPrompt={onCopyPrompt}
          />
        ))}
      </div>
    </div>
  );
};
