// scripts/convert-fonts-to-base64.js
const fs = require('fs');
const path = require('path');

const fontsDir = path.join(__dirname, '../public/fonts');
const outputFile = path.join(__dirname, '../utils/fontsBase64.ts');

const fonts = [
  { name: 'NotoSansRegular', file: 'NotoSans-Regular.ttf' },
  { name: 'NotoSansBold', file: 'NotoSans-Bold.ttf' },
  { name: 'NotoSansArabicRegular', file: 'NotoSansArabic-Regular.ttf' },
  { name: 'NotoSansArabicBold', file: 'NotoSansArabic-Bold.ttf' },
  { name: 'NotoSansJPRegular', file: 'NotoSansJP-Regular.ttf' },
  { name: 'NotoSansJPBold', file: 'NotoSansJP-Bold.ttf' },
];

let output = ' ';
output += ' ';

fonts.forEach(({ name, file }) => {
  const fontPath = path.join(fontsDir, file);
  
  if (!fs.existsSync(fontPath)) {
    console.warn(`Warning: Font file not found: ${file}`);
    return;
  }
  
  const fontBuffer = fs.readFileSync(fontPath);
  const base64 = fontBuffer.toString('base64');
  const dataUrl = `data:font/ttf;base64,${base64}`;
  
  output += `export const ${name} = '${dataUrl}';
`;
  console.log(`✓ Converted ${file} to base64 (${Math.round(base64.length / 1024)}KB)`);
});

fs.writeFileSync(outputFile, output);
console.log(`
✓ Font base64 file created: ${outputFile}`);
console.log(`Total size: ${Math.round(output.length / 1024)}KB`);
