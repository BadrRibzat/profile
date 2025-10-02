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

let output = '// Auto-generated font base64 exports\n';
output += '// Compatible with @react-pdf/renderer\n\n';

fonts.forEach(({ name, file }) => {
  const fontPath = path.join(fontsDir, file);
  
  if (!fs.existsSync(fontPath)) {
    console.warn(`⚠️  ${file} not found`);
    return;
  }
  
  const fontBuffer = fs.readFileSync(fontPath);
  const base64 = fontBuffer.toString('base64');
  
  // Split into chunks to avoid issues with very long strings
  const chunkSize = 100000;
  const chunks = [];
  for (let i = 0; i < base64.length; i += chunkSize) {
    chunks.push(base64.slice(i, i + chunkSize));
  }
  
  if (chunks.length === 1) {
    output += `export const ${name} = 'data:font/truetype;charset=utf-8;base64,${base64}';\n\n`;
  } else {
    output += `export const ${name} = [\n`;
    chunks.forEach((chunk, i) => {
      output += `  '${chunk}'${i < chunks.length - 1 ? ',' : ''}\n`;
    });
    output += `].join('');\n`;
    output += `// Reassemble: data:font/truetype;charset=utf-8;base64,\${${name}}\n\n`;
  }
  
  console.log(`✅ ${file} (${Math.round(base64.length / 1024)}KB)`);
});

fs.writeFileSync(outputFile, output);
console.log(`\n✅ ${outputFile} created`);
