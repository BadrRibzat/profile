// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

// Import base64 fonts from generated file
import * as fontsBase64 from './fontsBase64';

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
      
      // Register fonts with base64 data URLs
      Font.register({
        family: 'NotoSans',
        fonts: [
          { 
            src: fontsBase64.NotoSansRegular,
            fontWeight: 400 
          },
          { 
            src: fontsBase64.NotoSansBold,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { 
            src: fontsBase64.NotoSansArabicRegular,
            fontWeight: 400 
          },
          { 
            src: fontsBase64.NotoSansArabicBold,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { 
            src: fontsBase64.NotoSansJPRegular,
            fontWeight: 400 
          },
          { 
            src: fontsBase64.NotoSansJPBold,
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
