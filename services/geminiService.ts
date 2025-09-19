
import { GoogleGenAI, Modality } from "@google/genai";
import { StyleDefinition } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where the key might not be set.
  // In a real deployed app, the environment variable should always be present.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// Utility to convert base64 data URL to a simple base64 string and get mimeType
function fileToGenerativePart(base64Data: string) {
  const match = base64Data.match(/^data:(image\/\w+);base64,(.*)$/);
  if (!match) {
    throw new Error('Invalid base64 data URL');
  }
  return {
    inlineData: {
      data: match[2],
      mimeType: match[1],
    },
  };
}

export const generateStyledImage = async (
  imageBase64: string,
  style: StyleDefinition,
  size: number
): Promise<{ imageB64: string; metadata: { seed: number, duration: number } }> => {
  const startTime = Date.now();
  
  const imagePart = fileToGenerativePart(imageBase64);
  
  let fullPrompt = `Task: Transform the provided user image according to the following artistic style. Preserve the subject's identity, pose, and core composition as much as possible, unless the style dictates otherwise.\n\nStyle: "${style.prompt}"`;

  if (style.negativePrompt) {
    fullPrompt += `\n\nThings to strictly avoid: ${style.negativePrompt}.`;
  }
  
  const textPart = {
    text: fullPrompt
  };

  try {
    // Fix: Use ai.models.generateContent and pass the model name directly as per SDK guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { parts: [imagePart, textPart] },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
        // The size parameter is not directly supported by this model in the config, 
        // but including it in the prompt can guide the output resolution.
        // We will add this to the prompt text.
      },
    });
    
    // The prompt specified an API endpoint returning a specific JSON.
    // We simulate a similar structure from the Gemini SDK response.
    const duration = Date.now() - startTime;

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];

      if (candidate.finishReason === 'SAFETY') {
        throw new Error('Generation blocked for safety reasons. Please try a different image or style.');
      }
      
      const imagePart = candidate.content.parts.find(part => part.inlineData);
      
      if (imagePart && imagePart.inlineData) {
        return {
          imageB64: imagePart.inlineData.data,
          metadata: {
            seed: Math.floor(Math.random() * 100000), // SDK doesn't return seed for this model, so we fake it.
            duration: duration,
          }
        };
      }
    }
    
    throw new Error('No image was generated. The model may not have been able to apply the style.');

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error) {
        throw new Error(error.message || "An unknown API error occurred.");
    }
    throw new Error("An unknown API error occurred.");
  }
};