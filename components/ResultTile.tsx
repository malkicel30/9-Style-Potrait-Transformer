
import React from 'react';
import { GenerationResult } from '../types';
import { SkeletonLoader } from './SkeletonLoader';
import { CopyIcon, DownloadIcon, RefreshCwIcon, AlertTriangleIcon } from './Icons';

interface ResultTileProps {
  result: GenerationResult;
  onRegenerate: (key: string) => void;
  onCopyPrompt: (prompt: string) => void;
}

const downloadImage = (imageData: string, filename: string) => {
  const link = document.createElement('a');
  link.href = imageData;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const ResultTile: React.FC<ResultTileProps> = ({ result, onRegenerate, onCopyPrompt }) => {
  const renderContent = () => {
    switch (result.status) {
      case 'idle':
        return <SkeletonLoader />;
      case 'loading':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/80 backdrop-blur-sm transition-opacity duration-300">
            <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">{result.style.loadingMessage}</p>
          </div>
        );
      case 'success':
        return (
          <>
            <img src={result.imageData} alt={result.style.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 space-y-3">
              <button
                onClick={() => downloadImage(result.imageData!, `${result.key}.png`)}
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                <DownloadIcon className="w-4 h-4" />
                <span>Download</span>
              </button>
              <div className="flex space-x-2">
                <button
                  onClick={() => onRegenerate(result.key)}
                  className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-colors"
                  aria-label="Regenerate"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCopyPrompt(result.style.prompt)}
                  className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-colors"
                  aria-label="Copy Prompt"
                >
                  <CopyIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </>
        );
      case 'error':
        return (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 dark:bg-red-900/50 p-4 text-center">
                <AlertTriangleIcon className="w-8 h-8 text-red-500 mb-2"/>
                <p className="text-sm font-semibold text-red-700 dark:text-red-300">Generation Failed</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1 mb-3 line-clamp-2">{result.error}</p>
                <button
                    onClick={() => onRegenerate(result.key)}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors"
                >
                    <RefreshCwIcon className="w-4 h-4"/>
                    <span>Try Again</span>
                </button>
            </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden">
      <div className="aspect-square w-full relative bg-gray-100 dark:bg-gray-800">
        {renderContent()}
      </div>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <h4 className="font-semibold text-gray-800 dark:text-gray-200">{result.style.name}</h4>
      </div>
    </div>
  );
};
