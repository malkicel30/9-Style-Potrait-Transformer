
import React, { useCallback, useState, useRef } from 'react';
import { ImageFile } from '../types';
import { UploadCloudIcon, CheckCircleIcon, RefreshCwIcon, FileIcon } from './Icons';

interface UploadCardProps {
  onFileAccepted: (file: ImageFile) => void;
  existingFile?: ImageFile | null;
}

const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15 MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png'];

export const UploadCard: React.FC<UploadCardProps> = ({ onFileAccepted, existingFile }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError('Invalid file type. Please upload a JPG or PNG.');
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`File is too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setError('Could not process image.');
          return;
        }
        ctx.drawImage(img, 0, 0);
        const strippedBase64 = canvas.toDataURL(file.type);
        
        onFileAccepted({
          name: file.name,
          size: file.size,
          type: file.type,
          base64: strippedBase64,
          previewUrl: URL.createObjectURL(file),
        });
      };
      img.onerror = () => {
          setError('Could not read image file.');
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setError('Failed to read file.');
    };
    reader.readAsDataURL(file);
  }, [onFileAccepted]);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  if (existingFile) {
    return (
      <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Input Image</h3>
        <div className="aspect-square w-full rounded-lg overflow-hidden mb-4">
          <img src={existingFile.previewUrl} alt={existingFile.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex items-start space-x-3 text-sm text-gray-600 dark:text-gray-400">
          <FileIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-grow">
            <p className="font-medium text-gray-800 dark:text-gray-200 truncate">{existingFile.name}</p>
            <p>{(existingFile.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        </div>
        <button
          onClick={handleBrowseClick}
          className="mt-4 w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-gray-900"
        >
          <RefreshCwIcon className="w-4 h-4" />
          <span>Re-upload</span>
        </button>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={ACCEPTED_FILE_TYPES.join(',')} className="hidden" />
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700 text-center">
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`p-8 border-2 border-dashed rounded-lg transition-colors ${
          isDragging ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
            <UploadCloudIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-brand-600 dark:text-brand-400 cursor-pointer" onClick={handleBrowseClick}>Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">JPG or PNG (Max 15MB)</p>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept={ACCEPTED_FILE_TYPES.join(',')} className="hidden" />
        </div>
      </div>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <span>EXIF data stripped for privacy</span>
          </div>
        </div>
    </div>
  );
};
