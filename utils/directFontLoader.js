// utils/directFontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export const registerFontsDirect = async () => {
  if (fontsRegistered) return Promise.resolve();

  try {
    // Use direct font file URLs
    Font.register({
      family: 'NotoSans',
      fonts: [
        { 
          src: '/fonts/NotoSans-Regular.ttf',
          fontWeight: 400 
        },
        { 
          src: '/fonts/NotoSans-Bold.ttf',
          fontWeight: 700 
        },
      ],
    });

    Font.register({
      family: 'NotoSansArabic',
      fonts: [
        { 
          src: '/fonts/NotoSansArabic-Regular.ttf',
          fontWeight: 400 
        },
        { 
          src: '/fonts/NotoSansArabic-Bold.ttf',
          fontWeight: 700 
        },
      ],
    });

    Font.register({
      family: 'NotoSansJP',
      fonts: [
        { 
          src: '/fonts/NotoSansJP-Regular.ttf',
          fontWeight: 400 
        },
        { 
          src: '/fonts/NotoSansJP-Bold.ttf',
          fontWeight: 700 
        },
      ],
    });

    fontsRegistered = true;
    console.log('Fonts registered successfully with direct URLs');
  } catch (error) {
    console.error('Direct font registration failed:', error);
    // Fallback to built-in fonts
    Font.register({
      family: 'NotoSans',
      fonts: [
        { src: 'Helvetica', fontWeight: 400 },
        { src: 'Helvetica-Bold', fontWeight: 700 },
      ],
    });
    fontsRegistered = true;
  }
};
