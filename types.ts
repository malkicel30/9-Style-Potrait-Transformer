
export interface StyleDefinition {
  key: string;
  name: string;
  prompt: string;
  negativePrompt?: string;
  loadingMessage: string;
}

export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';

export interface GenerationResult {
  key: string;
  status: GenerationStatus;
  style: StyleDefinition;
  imageData?: string; // base64
  seed?: number;
  duration?: number;
  error?: string;
}

export interface ImageFile {
  name: string;
  size: number; // in bytes
  type: string;
  base64: string; // data URL
  previewUrl: string; // object URL
}

export interface GenerationSettings {
    size: 768 | 1024 | 1536 | 2048;
    lockSeed: boolean;
    enhanceFace: boolean; // Note: UI only for now
}

export interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}
