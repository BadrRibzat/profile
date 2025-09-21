// scripts/repair-fr-json.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'public/locales/fr/fr.json');

let content;
try {
  content = fs.readFileSync(filePath, 'utf8');
  
  // Fix common JSON errors
  content = content.replace(/\s+:/g, ':')  // Fix space before colon
                 .replace(/:\s+/g, ': ')  // Standardize space after colon
                 .replace(/,\s*}/g, '}')  // Remove trailing commas
                 .replace(/"[^"]*":\s*"[^"]*",?/g, match => {
                   // Fix quotes inside strings
                   return match.replace(/\\"/g, '"');
                 });

  fs.writeFileSync(filePath, content);
  console.log('French locale file repaired');
} catch (error) {
  console.error('Error repairing French locale:', error);
}
