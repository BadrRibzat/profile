// scripts/sync-translations.js
const fs = require('fs');
const path = require('path');

const SOURCE_LOCALE = 'en';
const TARGET_LOCALES = ['fr', 'ar', 'de', 'es', 'ja'];
const LOCALES_PATH = './public/locales';

// Helper function to safely parse JSON with error handling
function safeJsonParse(content, filePath) {
  try {
    // Remove comments and trailing commas
    let cleanContent = content
      .replace(/\/\/.*$/gm, '') // Remove single-line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/,(?=\s*[}\]])/g, ''); // Remove trailing commas
    
    return JSON.parse(cleanContent);
  } catch (error) {
    console.error(`❌ Error parsing JSON in ${filePath}:`, error.message);
    
    // Try to fix common JSON issues and parse again
    try {
      // More aggressive cleaning for malformed JSON
      cleanContent = content
        .replace(/\/\/.*$/gm, '')
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2":') // Ensure proper quotes around keys
        .replace(/,(?=\s*[}\]])/g, '')
        .replace(/'/g, '"'); // Replace single quotes with double quotes
      
      return JSON.parse(cleanContent);
    } catch (secondError) {
      console.error(`❌ Could not recover JSON in ${filePath}`);
      return {};
    }
  }
}

function loadLocale(locale) {
  const localePath = path.join(LOCALES_PATH, locale);
  const namespaces = {};
  
  if (!fs.existsSync(localePath)) {
    console.warn(`⚠️  Locale directory not found: ${localePath}`);
    return namespaces;
  }
  
  const files = fs.readdirSync(localePath);
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const namespace = file.replace('.json', '');
      const filePath = path.join(localePath, file);
      
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        namespaces[namespace] = safeJsonParse(content, filePath);
      } catch (error) {
        console.error(`❌ Error reading file ${filePath}:`, error.message);
        namespaces[namespace] = {};
      }
    }
  });
  
  return namespaces;
}

function saveLocale(locale, namespaces) {
  const localePath = path.join(LOCALES_PATH, locale);
  
  // Ensure the locale directory exists
  if (!fs.existsSync(localePath)) {
    fs.mkdirSync(localePath, { recursive: true });
  }
  
  Object.entries(namespaces).forEach(([namespace, data]) => {
    const filePath = path.join(localePath, `${namespace}.json`);
    
    try {
      // Sort keys alphabetically for better readability
      const sortedData = {};
      Object.keys(data).sort().forEach(key => {
        sortedData[key] = data[key];
      });
      
      const content = JSON.stringify(sortedData, null, 2);
      fs.writeFileSync(filePath, content + '\n', 'utf8'); // Add newline at end
    } catch (error) {
      console.error(`❌ Error writing file ${filePath}:`, error.message);
    }
  });
}

function syncTranslations() {
  console.log('🔄 Syncing translations...');
  
  // Load source locale
  console.log(`\nLoading source locale (${SOURCE_LOCALE})...`);
  const source = loadLocale(SOURCE_LOCALE);
  
  if (Object.keys(source).length === 0) {
    console.error('❌ No source locale data found!');
    return;
  }
  
  // Process each target locale
  TARGET_LOCALES.forEach(locale => {
    console.log(`\nProcessing ${locale}...`);
    const target = loadLocale(locale);
    let added = 0;
    let removed = 0;
    
    // Sync each namespace
    Object.entries(source).forEach(([namespace, sourceData]) => {
      if (!target[namespace]) {
        target[namespace] = {};
        console.log(`  📁 Created new namespace: ${namespace}`);
      }
      
      const targetData = target[namespace];
      
      // Add missing keys
      Object.entries(sourceData).forEach(([key, value]) => {
        if (targetData[key] === undefined) {
          // For non-English locales, add TODO placeholder
          // For English, just copy the value directly
          targetData[key] = locale === 'en' ? value : `[TODO: Translate] ${value}`;
          added++;
        }
      });
      
      // Remove unused keys
      Object.keys(targetData).forEach(key => {
        if (sourceData[key] === undefined) {
          delete targetData[key];
          removed++;
        }
      });
    });
    
    // Save updated locale
    saveLocale(locale, target);
    console.log(`  ✅ Added ${added} missing translations`);
    console.log(`  ✅ Removed ${removed} unused translations`);
  });
  
  console.log('\n🎉 Translation sync complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Review and translate all [TODO: Translate] placeholders');
  console.log('2. Run "npm run check-translations" to verify everything is synced');
  console.log('3. Test your application in different languages');
}

// Run the script
syncTranslations();
