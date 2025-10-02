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
        console.warn(`Missing font exports: ${missingFonts.join(', ')}`);
        throw new Error(`Missing font exports: ${missingFonts.join(', ')}`);
      }
      
      // FIX: Use proper font format detection and fallback
      const createFontData = (base64Data) => {
        if (!base64Data || typeof base64Data !== 'string') {
          throw new Error('Invalid font data: not a string');
        }
        
        // Check if it's already a data URL
        if (base64Data.startsWith('data:')) {
          return base64Data;
        }
        
        // If it's raw base64, create proper data URL
        if (/^[A-Za-z0-9+/=]+$/.test(base64Data)) {
          return `data:font/ttf;base64,${base64Data}`;
        }
        
        throw new Error('Invalid font data format');
      };

      // Register fonts with proper data URL format
      Font.register({
        family: 'NotoSans',
        fonts: [
          { 
            src: createFontData(fonts.NotoSansRegular),
            fontWeight: 400 
          },
          { 
            src: createFontData(fonts.NotoSansBold),
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansArabic',
        fonts: [
          { 
            src: createFontData(fonts.NotoSansArabicRegular),
            fontWeight: 400 
          },
          { 
            src: createFontData(fonts.NotoSansArabicBold),
            fontWeight: 700 
          },
        ],
      });

      Font.register({
        family: 'NotoSansJP',
        fonts: [
          { 
            src: createFontData(fonts.NotoSansJPRegular),
            fontWeight: 400 
          },
          { 
            src: createFontData(fonts.NotoSansJPBold),
            fontWeight: 700 
          },
        ],
      });

      fontsRegistered = true;
      console.log('Fonts registered successfully with base64');
      resolve();
    } catch (error) {
      console.error('Font registration failed:', error);
      
      // Use built-in fonts as fallback
      try {
        console.log('Using built-in font fallbacks...');
        
        // Register with standard PDF fonts (built into react-pdf)
        Font.register({
          family: 'NotoSans',
          fonts: [
            { src: FALLBACK_FONTS.NotoSans, fontWeight: 400 },
            { src: FALLBACK_FONTS.NotoSans, fontWeight: 700, fontStyle: 'normal' },
          ],
        });
        
        Font.register({
          family: 'NotoSansArabic',
          fonts: [
            { src: FALLBACK_FONTS.NotoSansArabic, fontWeight: 400 },
            { src: FALLBACK_FONTS.NotoSansArabic, fontWeight: 700, fontStyle: 'normal' },
          ],
        });
        
        Font.register({
          family: 'NotoSansJP',
          fonts: [
            { src: FALLBACK_FONTS.NotoSansJP, fontWeight: 400 },
            { src: FALLBACK_FONTS.NotoSansJP, fontWeight: 700, fontStyle: 'normal' },
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
