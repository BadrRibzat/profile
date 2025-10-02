// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

// Import base64 fonts directly by name from the generated file.
// This ensures each named export is correctly resolved.
import {
  NotoSansRegular,
  NotoSansBold,
  NotoSansArabicRegular,
  NotoSansArabicBold,
  NotoSansJPRegular,
  NotoSansJPBold,
} from './fontsBase64';

let fontsRegistered = false;
let fontLoadingPromise = null;

export const registerFonts = async () => {
  if (fontLoadingPromise) {
    return fontLoadingPromise;
  }

  if (fontsRegistered) return Promise.resolve();
  
  fontLoadingPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Starting font registration with base64...');
      
      // Register fonts with base64 data URLs, using directly imported variables
      Font.register({
        family: 'NotoSans',
        fonts: [
          { 
            src: NotoSansRegular, // Using the directly imported variable
            fontWeight: 400 
          },
          { 
            src: NotoSansBold, // Using the directly imported variable
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { 
            src: NotoSansArabicRegular, // Using the directly imported variable
            fontWeight: 400 
          },
          { 
            src: NotoSansArabicBold, // Using the directly imported variable
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { 
            src: NotoSansJPRegular, // Using the directly imported variable
            fontWeight: 400 
          },
          { 
            src: NotoSansJPBold, // Using the directly imported variable
            fontWeight: 700 
          },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully with base64');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      
      // Fallback to system fonts
      try {
        console.log('Using system font fallbacks...');
        
        Font.register({
          family: 'NotoSans',
          fonts: [
            { src: 'Helvetica', fontWeight: 400 },
            { src: 'Helvetica-Bold', fontWeight: 700 },
          ],
        });
        
        Font.register({
          family: 'NotoSansArabic',
          fonts: [
            { src: 'Arial', fontWeight: 400 },
            { src: 'Arial-Bold', fontWeight: 700 },
          ],
        });
        
        Font.register({
          family: 'NotoSansJP',
          fonts: [
            { src: 'Arial', fontWeight: 400 },
            { src: 'Arial-Bold', fontWeight: 700 },
          ],
        });
        
        fontsRegistered = true;
        console.warn('Using system font fallbacks');
        resolve();
      } catch (fallbackError) {
        console.error('Fallback font registration failed:', fallbackError);
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
