
import { StyleDefinition } from './types';

export const STYLES: StyleDefinition[] = [
  {
    key: "inpasto",
    name: "Inpasto",
    prompt: "An expressive oil painting portrait in extreme impasto style, created with bold palette knife strokes and thick layered paint on canvas. The brushstrokes are heavy, textured, and clearly visible, forming ridges of color that shine under light. The face is abstract-painterly, not photorealistic, with vibrant luminous colors blending in bold contrasts of warm and cool tones. The background swirls with dynamic impasto strokes, creating a dramatic, museum-quality masterpiece full of depth, texture, and energy — in the style of Van Gogh and Leonid Afremov.",
    loadingMessage: "Painting in Inpasto..."
  },
  {
    key: "caricature",
    name: "Caricature",
    prompt: "A digital illustration of a person based on the reference photo, drawn in the style of romantic slice-of-life manhua. Clean expressive line art, warm flat colors, minimal soft shading, subtle blush on the cheeks. Deadpan yet cute facial expression, cozy and casual atmosphere. Simple solid warm background (like orange or pastel). The style should be playful, charming, and intimate, resembling couple aesthetic manhua illustrations.",
    negativePrompt: "realistic photo, 3d render, hyper-detailed, horror, dark atmosphere, messy background, extra limbs, text, watermark",
    loadingMessage: "Drawing Caricature..."
  },
  {
    key: "popart_figure",
    name: "Popart Figure",
    prompt: "Ultra-clean Pop Art illustration, bold thick outlines, flat vibrant colors, strong comic-style contrast, expressive halftone dots, graphic poster aesthetic. Polished professional Pop Art vector finish, inspired by Roy Lichtenstein. Maintain exact facial structure and likeness 100%, preserve identity without altering or distorting face. Pure Pop Art comic aesthetic, elegant and striking poster look. Avoid photo textures and raster effects.",
    loadingMessage: "Creating Pop Art..."
  },
  {
    key: "romantic",
    name: "Romantic Style",
    prompt: "A digital illustration of a person based on the reference photo, drawn in the style of romantic slice-of-life manhua. Clean expressive line art, warm flat colors, minimal soft shading, subtle blush on the cheeks. Deadpan yet cute facial expression, cozy and casual atmosphere. Simple solid warm background (like orange or pastel). The style should be playful, charming, and intimate, resembling couple aesthetic manhua illustrations.",
    negativePrompt: "realistic photo, 3d render, hyper-detailed, horror, dark atmosphere, messy background, extra limbs, text, watermark",
    loadingMessage: "Illustrating Romantic style..."
  },
  {
    key: "simpson",
    name: "Simpson Style",
    prompt: "A portrait of the person from the reference photo, keeping the identical facial structure, hairstyle, and pose from the reference. Transform the person into Simpsons cartoon style — classic yellow skin tone, large round cartoon eyes with black pupils, simplified clean outlines, flat shading, and humorous yet expressive features. Maintain the same background as in the reference photo, but also converted into the Simpsons universe aesthetic — minimalistic, colorful, smooth cartoon lines, and flat vibrant tones. High-resolution digital illustration, smooth vector-like finish, consistent Simpsons cartoon look.",
    loadingMessage: "Springfield-izing..."
  },
  {
    key: "wpap",
    name: "WPAP Style",
    prompt: "Create a WPAP (Wedha's Pop Art Portrait) vector illustration based on the uploaded photo. Use bold geometric shapes and highly vibrant, contrasting colors, emphasizing red, blue, yellow, and green tones. Highlight facial features with sharp polygonal divisions and strong lines. Add dynamic color shadows and subtle glowing edges to make the portrait pop. Include a minimalistic or gradient background that complements the color scheme, ensuring the figure stands out dramatically. Maintain clean vector quality, modern pop-art style, and a visually striking, artistic look suitable for digital display or printing.",
    loadingMessage: "Geometrizing in WPAP..."
  },
  {
    key: "bibli",
    name: "Bibli Style",
    prompt: "Transform this photo into a charming Bibli-style cartoon illustration with soft pastel colors, clean thin outlines, smooth shading, subtle watercolor texture, rounded proportions, large expressive eyes, warm cozy mood, softly diffused lighting, high-resolution. Avoid text or watermarks.",
    loadingMessage: "Crafting Bibli style..."
  },
  {
    key: "bolt_old",
    name: "Bolt Old (Old Rubber-Hose)",
    prompt: "Create an illustration in Bolt Old Cartoon style with rubber-hose limbs, black-and-white color palette, grainy vintage texture, bold ink outlines, simple round shapes, big expressive eyes, exaggerated facial expressions, classic 1930s cartoon aesthetics, film grain and slight vignette, high-resolution. Avoid text or watermarks.",
    loadingMessage: "Going vintage..."
  },
  {
    key: "pop_toon",
    name: "Pop Toon Style",
    prompt: "Create a vibrant Pop Toon style illustration with bold thick outlines, saturated bright colors, flat shading, playful exaggerated proportions, comic book halftone textures, energetic dynamic poses, expressive faces, clean background shapes, high-resolution. Avoid text or watermarks.",
    loadingMessage: "Popping with Toon style..."
  }
];
