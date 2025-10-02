// utils/fontLoader.js
import { Font } from '@react-pdf/renderer';

let fontsRegistered = false;

export const registerFonts = async () => {
  if (fontsRegistered) return Promise.resolve();
  
  try {
    console.log('Registering fonts from CDN...');
    
    // Use Google Fonts CDN URLs
    Font.register({
      family: 'NotoSans',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/notosans/v30/o-0IIpQlx3QUlC5A4PNr5TRASf6M7Q.ttf',
          fontWeight: 400 
        },
        { 
          src: 'https://fonts.gstatic.com/s/notosans/v30/o-0NIpQlx3QUlC5A4PNjXhFVZNyB.ttf',
          fontWeight: 700 
        },
      ],
    });

    Font.register({
      family: 'NotoSansArabic',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5.ttf',
          fontWeight: 400 
        },
        { 
          src: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpxtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5.ttf',
          fontWeight: 700 
        },
      ],
    });

    Font.register({
      family: 'NotoSansJP',
      fonts: [
        { 
          src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf',
          fontWeight: 400 
        },
        { 
          src: 'https://fonts.gstatic.com/s/notosansjp/v52/-F6jfjtqLzI2JPCgQBnw7HFyzSD-AsregP8VFBEj75vY0rw-oME.ttf',
          fontWeight: 700 
        },
      ],
    });

    fontsRegistered = true;
    console.log('Fonts registered successfully from CDN');
  } catch (error) {
    console.error('Font registration failed:', error);
    // Fallback to system fonts
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

export const isFontsRegistered = () => fontsRegistered;
