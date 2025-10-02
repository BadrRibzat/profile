// utils/fontLoader.js - Simplified version using only built-in fonts
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export const registerFonts = async () => {
  if (fontsRegistered) return Promise.resolve();

  try {
    console.log('Using built-in PDF fonts (Helvetica, Times-Roman, Courier)');
    
    // Use only built-in fonts that are guaranteed to work
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
        { src: 'Helvetica', fontWeight: 400 },
        { src: 'Helvetica-Bold', fontWeight: 700 },
      ],
    });

    Font.register({
      family: 'NotoSansJP',
      fonts: [
        { src: 'Helvetica', fontWeight: 400 },
        { src: 'Helvetica-Bold', fontWeight: 700 },
      ],
    });

    fontsRegistered = true;
    console.log('Built-in fonts registered successfully');
  } catch (error) {
    console.error('Font registration failed, but continuing with defaults:', error);
    fontsRegistered = true;
  }

  return Promise.resolve();
};

export const isFontsRegistered = () => fontsRegistered;
export const resetFontRegistration = () => {
  fontsRegistered = false;
};
