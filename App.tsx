
import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { UploadCard } from './components/UploadCard';
import { ControlsPanel } from './components/ControlsPanel';
import { ResultsGrid } from './components/ResultsGrid';
import { Toaster, Toast } from './components/Toaster';
import { generateStyledImage } from './services/geminiService';
// Fix: Import StyleDefinition from './types' instead of './constants' as it is not exported from there.
import { STYLES } from './constants';
import { GenerationResult, GenerationSettings, ImageFile, ToastMessage, StyleDefinition } from './types';

// Declare JSZip for use in the component
declare const JSZip: any;

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [results, setResults] = useState<GenerationResult[]>([]);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [settings, setSettings] = useState<GenerationSettings>({
    size: 1024,
    lockSeed: false,
    enhanceFace: false,
  });

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const clearState = useCallback(() => {
    setImageFile(null);
    setResults([]);
    setIsGenerating(false);
    addToast('Cleared session.', 'info');
  }, [addToast]);
  
  const handleFileAccepted = (file: ImageFile) => {
    setImageFile(file);
    const initialResults = STYLES.map(style => ({
      key: style.key,
      status: 'idle' as const,
      style: style,
    }));
    setResults(initialResults);
    addToast('Image uploaded successfully!', 'success');
  };

  const handleGeneration = useCallback(async (stylesToGenerate: StyleDefinition[]) => {
    if (!imageFile) {
      addToast('Please upload an image first.', 'error');
      return;
    }

    setIsGenerating(true);

    const baseSeed = settings.lockSeed ? (Math.floor(Math.random() * 100000)) : null;

    const processQueue = async (queue: StyleDefinition[]) => {
      const MAX_CONCURRENCY = 3;
      const running: Promise<void>[] = [];
      const results: GenerationResult[] = [];

      const runTask = async (style: StyleDefinition) => {
        const seed = baseSeed ? baseSeed + STYLES.findIndex(s => s.key === style.key) : undefined;
        setResults(prev => prev.map(r => r.key === style.key ? { ...r, status: 'loading', seed } : r));
        
        try {
          const { imageB64, metadata } = await generateStyledImage(imageFile.base64, style, settings.size);
          setResults(prev => prev.map(r => r.key === style.key ? {
            ...r,
            status: 'success',
            imageData: `data:image/png;base64,${imageB64}`,
            seed: metadata.seed,
            duration: metadata.duration
          } : r));
        } catch (error) {
          console.error(`Failed to generate style ${style.name}:`, error);
          const errorMessage = (error as Error).message || 'An unknown error occurred.';
          addToast(`Error generating ${style.name}`, 'error');
          setResults(prev => prev.map(r => r.key === style.key ? { ...r, status: 'error', error: errorMessage } : r));
        }
      };

      for (const style of queue) {
        const promise = runTask(style);
        results.push(promise as any); 
        
        if (running.length < MAX_CONCURRENCY) {
            running.push(promise);
            promise.finally(() => {
                const index = running.indexOf(promise);
                if (index > -1) {
                    running.splice(index, 1);
                }
            });
        }
        
        if (running.length >= MAX_CONCURRENCY) {
            await Promise.race(running);
        }
      }
      await Promise.all(results);
    };
    
    await processQueue(stylesToGenerate);
    setIsGenerating(false);
    addToast('Generation complete!', 'success');
  }, [imageFile, settings, addToast]);

  const handleRegenerate = useCallback((styleKey: string) => {
    const styleToRegen = STYLES.find(s => s.key === styleKey);
    if (styleToRegen) {
      handleGeneration([styleToRegen]);
    }
  }, [handleGeneration]);

  const handleRegenerateAll = useCallback(() => {
    handleGeneration(STYLES);
  }, [handleGeneration]);

  const handleDownloadAll = useCallback(async () => {
    const successfulResults = results.filter(r => r.status === 'success' && r.imageData);
    if (successfulResults.length === 0) {
      addToast('No images to download.', 'error');
      return;
    }

    addToast('Preparing ZIP file...', 'info');
    const zip = new JSZip();
    for (const [index, result] of successfulResults.entries()) {
      const filename = `${String(index + 1).padStart(2, '0')}_${result.key}.png`;
      const base64Data = result.imageData!.split(',')[1];
      zip.file(filename, base64Data, { base64: true });
    }

    try {
        const content = await zip.generateAsync({ type: 'blob' });
        const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `styled_bundle_${timestamp}.zip`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        addToast('ZIP download started!', 'success');
    } catch(e) {
        console.error(e);
        addToast('Failed to create ZIP file.', 'error');
    }

  }, [results, addToast]);

  useEffect(() => {
    if (imageFile && results.every(r => r.status === 'idle')) {
      handleGeneration(STYLES);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);


  return (
    <div className="min-h-screen font-sans">
      <Header onClear={clearState} />
      <main className="container mx-auto p-4 md:p-8">
        {!imageFile ? (
          <div className="max-w-3xl mx-auto">
            <UploadCard onFileAccepted={handleFileAccepted} />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="lg:col-span-4 xl:col-span-3 space-y-8">
              <UploadCard
                existingFile={imageFile}
                onFileAccepted={handleFileAccepted}
              />
              <ControlsPanel
                settings={settings}
                onSettingsChange={setSettings}
                isGenerating={isGenerating}
              />
            </aside>
            <div className="lg:col-span-8 xl:col-span-9">
              <ResultsGrid
                results={results}
                isGenerating={isGenerating}
                onRegenerate={handleRegenerate}
                onRegenerateAll={handleRegenerateAll}
                onDownloadAll={handleDownloadAll}
                onCopyPrompt={(prompt) => {
                  navigator.clipboard.writeText(prompt);
                  addToast('Prompt copied to clipboard!', 'success');
                }}
              />
            </div>
          </div>
        )}
      </main>
      <Toaster>
        {toasts.map(({ id, message, type }) => (
          <Toast key={id} message={message} type={type} onDismiss={() => setToasts(p => p.filter(t => t.id !== id))} />
        ))}
      </Toaster>
    </div>
  );
};

export default App;