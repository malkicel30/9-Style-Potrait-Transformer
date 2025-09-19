
import React from 'react';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-full bg-gray-200 dark:bg-gray-700/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent animate-shimmer" style={{ transform: 'translateX(-100%)' }}></div>
    </div>
  );
};
