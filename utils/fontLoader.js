// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;
let fontLoadingPromise = null;

export const registerFonts = async () => {
  if (fontLoadingPromise) {
    return fontLoadingPromise;
  }

  if (fontsRegistered) return Promise.resolve();
  
  fontLoadingPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Starting font registration...');
      
      // Get the base URL for production/development
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_VERCEL_URL 
          ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
          : 'http://localhost:3000';
      
      console.log('Loading fonts from:', baseUrl);
      
      // Register fonts with absolute URLs
      Font.register({
        family: 'NotoSans',
        fonts: [
          { 
            src: `${baseUrl}/fonts/NotoSans-Regular.ttf`,
            fontWeight: 400 
          },
          { 
            src: `${baseUrl}/fonts/NotoSans-Bold.ttf`,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { 
            src: `${baseUrl}/fonts/NotoSansArabic-Regular.ttf`,
            fontWeight: 400 
          },
          { 
            src: `${baseUrl}/fonts/NotoSansArabic-Bold.ttf`,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { 
            src: `${baseUrl}/fonts/NotoSansJP-Regular.ttf`,
            fontWeight: 400 
          },
          { 
            src: `${baseUrl}/fonts/NotoSansJP-Bold.ttf`,
            fontWeight: 700 
          },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      
      // Register fallback system fonts
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
