// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;
let fontLoadingPromise = null;

export const registerFonts = async () => {
  if (fontLoadingPromise) return fontLoadingPromise;
  if (fontsRegistered) return Promise.resolve();
  
  fontLoadingPromise = new Promise(async (resolve) => {
    try {
      console.log('Starting font registration with base64...');
      
      const fonts = await import('./fontsBase64');
      
      // Register with proper format
      Font.register({
        family: 'NotoSans',
        fonts: [
          { src: fonts.NotoSansRegular, fontWeight: 400 },
          { src: fonts.NotoSansBold, fontWeight: 700 },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { src: fonts.NotoSansArabicRegular, fontWeight: 400 },
          { src: fonts.NotoSansArabicBold, fontWeight: 700 },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { src: fonts.NotoSansJPRegular, fontWeight: 400 },
          { src: fonts.NotoSansJPBold, fontWeight: 700 },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully with base64');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      // Use Helvetica as fallback (built into PDF spec)
      fontsRegistered = true;
      resolve();
    }
  });

  return fontLoadingPromise;
};

export const isFontsRegistered = () => fontsRegistered;
export const resetFontRegistration = () => {
  fontsRegistered = false;
  fontLoadingPromise = null;
};
