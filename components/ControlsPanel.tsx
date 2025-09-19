
import React from 'react';
import { GenerationSettings } from '../types';

interface ControlsPanelProps {
  settings: GenerationSettings;
  onSettingsChange: (settings: GenerationSettings) => void;
  isGenerating: boolean;
}

const SIZES = [768, 1024, 1536, 2048];

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ settings, onSettingsChange, isGenerating }) => {
  const handleSizeChange = (size: GenerationSettings['size']) => {
    onSettingsChange({ ...settings, size });
  };
  
  const handleToggle = (key: keyof Pick<GenerationSettings, 'lockSeed' | 'enhanceFace'>) => {
    onSettingsChange({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-4">Controls</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Quality (Size)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {SIZES.map(size => (
              <button
                key={size}
                onClick={() => handleSizeChange(size as GenerationSettings['size'])}
                disabled={isGenerating}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                  settings.size === size
                    ? 'bg-brand-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {size}px
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="lockSeed" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Lock Seed
          </label>
          <button
            id="lockSeed"
            onClick={() => handleToggle('lockSeed')}
            disabled={isGenerating}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
              settings.lockSeed ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.lockSeed ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        
        <div className="flex items-center justify-between opacity-50">
          <label htmlFor="enhanceFace" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Enhance Face
            <span className="text-xs ml-1 text-gray-400">(Model Dependant)</span>
          </label>
          <button
            id="enhanceFace"
            onClick={() => handleToggle('enhanceFace')}
            disabled={true} // Disabled as not supported by model
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-not-allowed rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
              settings.enhanceFace ? 'bg-brand-600' : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.enhanceFace ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
