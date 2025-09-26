// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;
let fontLoadingPromise = null;

// Helper function to get the correct font path based on environment
const getFontPath = (fontFile) => {
  // Use a relative path directly. Next.js will serve from /public.
  // When deploying, the base URL should be handled by Next.js or the server.
  // For local development, '/fonts/...' is already relative to the domain.
  // We're removing the `process.env.NEXT_PUBLIC_DOMAIN` part for simplicity and common usage.
  return `/fonts/${fontFile}`;
};

export const registerFonts = async () => {
  // Return existing promise if already loading
  if (fontLoadingPromise) {
    return fontLoadingPromise;
  }

  if (fontsRegistered) return Promise.resolve();
  
  fontLoadingPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Starting font registration...');
      
      // Register fonts with direct URLs. react-pdf will fetch them.
      Font.register({
        family: 'NotoSans',
        fonts: [
          { src: getFontPath('NotoSans-Regular.ttf'), fontWeight: 400 },
          { src: getFontPath('NotoSans-Bold.ttf'), fontWeight: 700 },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { src: getFontPath('NotoSansArabic-Regular.ttf'), fontWeight: 400 },
          { src: getFontPath('NotoSansArabic-Bold.ttf'), fontWeight: 700 },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { src: getFontPath('NotoSansJP-Regular.ttf'), fontWeight: 400 },
          { src: getFontPath('NotoSansJP-Bold.ttf'), fontWeight: 700 },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      
      // Register fallback system fonts (e.g., Helvetica, Arial)
      try {
        Font.register({
          family: 'NotoSans',
          src: 'Helvetica'
        });
        Font.register({
          family: 'NotoSansArabic',
          src: 'Arial'
        });
        Font.register({
          family: 'NotoSansJP',
          src: 'Arial'
        });
        
        fontsRegistered = true;
        console.warn('Using system font fallbacks');
        resolve();
      } catch (fallbackError) {
        console.error('Even fallback font registration failed:', fallbackError);
        reject(error);
      }
    }
  });

  return fontLoadingPromise;
};

export const isFontsRegistered = () => fontsRegistered;

export const resetFontRegistration = () => {
  fontsRegistered = false;
  fontLoadingPromise = null;
};
