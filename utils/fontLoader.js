// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export const registerFonts = async () => {
  if (fontsRegistered) return Promise.resolve();
  
  try {
    console.log('Registering fallback fonts...');
    
    // Use system fonts that work everywhere (Helvetica/Arial)
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
    console.log('Fallback fonts registered successfully');
    return Promise.resolve();
  } catch (error) {
    console.error('Font registration failed:', error);
    fontsRegistered = true;
    return Promise.resolve(); // Continue with no fonts
  }
};

export const isFontsRegistered = () => fontsRegistered;

export const resetFontRegistration = () => {
  fontsRegistered = false;
};
