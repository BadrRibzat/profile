// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

// Import the auto-generated base64 font data
import {
  NotoSans_Regular,
  NotoSans_Bold,
  NotoSansArabic_Regular,
  NotoSansArabic_Bold,
  NotoSansJP_Regular,
  NotoSansJP_Bold,
} from './fontsBase64';

let fontsRegistered = false;

// This function registers the fonts with @react-pdf/renderer
export const registerFonts = async () => {
  // If fonts are already registered, do nothing.
  if (fontsRegistered) {
    return;
  }

  try {
    console.log('Registering fonts with base64 data...');

    Font.register({
      family: 'NotoSans',
      fonts: [
        { src: NotoSans_Regular, fontWeight: 400 },
        { src: NotoSans_Bold, fontWeight: 700 },
      ],
    });

    Font.register({
      family: 'NotoSansArabic',
      fonts: [
        { src: NotoSansArabic_Regular, fontWeight: 400 },
        { src: NotoSansArabic_Bold, fontWeight: 700 },
      ],
    });

    Font.register({
      family: 'NotoSansJP',
      fonts: [
        { src: NotoSansJP_Regular, fontWeight: 400 },
        { src: NotoSansJP_Bold, fontWeight: 700 },
      ],
    });

    fontsRegistered = true;
    console.log('✅ Fonts registered successfully!');
  } catch (error) {
    console.error('❌ Font registration failed:', error);
    // As a fallback, you could register system fonts, but we'll rely on our base64 for now.
    throw new Error('Could not register custom fonts.');
  }
};
