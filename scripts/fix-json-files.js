// scripts/fix-json-files.js
const fs = require('fs');
const path = require('path');

const LOCALES_PATH = './public/locales';
const LOCALES = ['en', 'fr', 'ar', 'de', 'es', 'ja'];

function fixJsonFiles() {
  console.log('🔧 Fixing JSON files...');
  
  LOCALES.forEach(locale => {
    const localePath = path.join(LOCALES_PATH, locale);
    
    if (!fs.existsSync(localePath)) {
      console.warn(`⚠️  Locale directory not found: ${localePath}`);
      return;
    }
    
    const files = fs.readdirSync(localePath);
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(localePath, file);
        
        try {
          let content = fs.readFileSync(filePath, 'utf8');
          
          // Fix common JSON issues
          content = content
            .replace(/\/\/.*$/gm, '') // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/,(?=\s*[}\]])/g, '') // Remove trailing commas
            .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure proper quotes around keys
            .replace(/'/g, '"'); // Replace single quotes with double quotes
          
          // Parse and re-stringify to ensure valid JSON
          const parsed = JSON.parse(content);
          const fixedContent = JSON.stringify(parsed, null, 2) + '\n';
          
          fs.writeFileSync(filePath, fixedContent, 'utf8');
          console.log(`✅ Fixed: ${locale}/${file}`);
        } catch (error) {
          console.error(`❌ Could not fix: ${locale}/${file}:`, error.message);
        }
      }
    });
  });
  
  console.log('\n🎉 JSON files fixed!');
}

// Run the script
fixJsonFiles();
