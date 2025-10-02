// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;
let fontLoadingPromise = null;

// Standard fonts that work in @react-pdf/renderer (built-in)
const FALLBACK_FONTS = {
  NotoSans: 'Helvetica',
  NotoSansArabic: 'Helvetica', 
  NotoSansJP: 'Helvetica'
};

export const registerFonts = async () => {
  if (fontLoadingPromise) {
    return fontLoadingPromise;
  }

  if (fontsRegistered) return Promise.resolve();
  
  fontLoadingPromise = new Promise(async (resolve, reject) => {
    try {
      console.log('Starting font registration with base64...');
      
      // Dynamic import to handle the fonts
      const fonts = await import('./fontsBase64');
      
      // Validate all fonts are loaded
      const requiredFonts = [
        'NotoSansRegular', 
        'NotoSansBold',
        'NotoSansArabicRegular',
        'NotoSansArabicBold',
        'NotoSansJPRegular',
        'NotoSansJPBold'
      ];
      
      const missingFonts = requiredFonts.filter(font => !fonts[font]);
      
      if (missingFonts.length > 0) {
        throw new Error(`Missing font exports: ${missingFonts.join(', ')}`);
      }
      
      // Validate base64 data format
      if (!fonts.NotoSansRegular.startsWith('data:font/')) {
        throw new Error('Invalid font data format');
      }
      
      // Register fonts with base64 data URLs
      Font.register({
        family: 'NotoSans',
        fonts: [
          { 
            src: fonts.NotoSansRegular,
            fontWeight: 400 
          },
          { 
            src: fonts.NotoSansBold,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { 
            src: fonts.NotoSansArabicRegular,
            fontWeight: 400 
          },
          { 
            src: fonts.NotoSansArabicBold,
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { 
            src: fonts.NotoSansJPRegular,
            fontWeight: 400 
          },
          { 
            src: fonts.NotoSansJPBold,
            fontWeight: 700 
          },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully with base64');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      
      // Use built-in fonts as fallback (these are supported by react-pdf)
      try {
        console.log('Using built-in font fallbacks...');
        
        // Register with standard PDF fonts (built into react-pdf)
        Font.register({
          family: 'NotoSans',
          fonts: [
            { src: FALLBACK_FONTS.NotoSans, fontWeight: 400 },
            { src: `${FALLBACK_FONTS.NotoSans}-Bold`, fontWeight: 700 },
          ],
        });
        
        Font.register({
          family: 'NotoSansArabic',
          fonts: [
            { src: FALLBACK_FONTS.NotoSansArabic, fontWeight: 400 },
            { src: `${FALLBACK_FONTS.NotoSansArabic}-Bold`, fontWeight: 700 },
          ],
        });
        
        Font.register({
          family: 'NotoSansJP',
          fonts: [
            { src: FALLBACK_FONTS.NotoSansJP, fontWeight: 400 },
            { src: `${FALLBACK_FONTS.NotoSansJP}-Bold`, fontWeight: 700 },
          ],
        });
        
        fontsRegistered = true;
        console.warn('Using built-in font fallbacks - Arabic and Japanese text may not display correctly');
        resolve();
      } catch (fallbackError) {
        console.error('Fallback font registration failed:', fallbackError);
        // Don't reject - allow PDF generation to continue
        fontsRegistered = true;
        console.warn('PDF generation will continue without custom fonts');
        resolve();
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
