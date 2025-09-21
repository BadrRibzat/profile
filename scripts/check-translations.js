// scripts/check-translations.js
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

// Configuration
const LOCALES_PATH = './public/locales';
const COMPONENTS_PATH = './components';
const PAGES_PATH = './pages';
const DEFAULT_LOCALE = 'en';
const SUPPORTED_LOCALES = ['en', 'fr', 'ar', 'de', 'es', 'ja'];

// Extract translation keys from code
async function extractKeysFromFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    const keys = new Set();
    
    // Match t('key') or t("key") patterns
    const tFunctionRegex = /t\(['"`]([^'"`]+)['"`]\)/g;
    let match;
    while ((match = tFunctionRegex.exec(content)) !== null) {
      keys.add(match[1]);
    }
    
    // Match useTranslation('namespace') patterns to get namespaces
    const namespaceRegex = /useTranslation\(['"`]([^'"`]+)['"`]\)/g;
    while ((match = namespaceRegex.exec(content)) !== null) {
      keys.add(match[1]); // This is actually a namespace, but we'll track it
    }
    
    return Array.from(keys);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return [];
  }
}

// Recursively find all files in a directory
async function findFiles(dir, extensions = ['.tsx', '.ts', '.js', '.jsx']) {
  let results = [];
  const list = await readdir(dir, { withFileTypes: true });
  
  for (const item of list) {
    const res = path.resolve(dir, item.name);
    if (item.isDirectory()) {
      results = results.concat(await findFiles(res, extensions));
    } else if (extensions.includes(path.extname(item.name))) {
      results.push(res);
    }
  }
  
  return results;
}

// Load locale files
async function loadLocaleFiles() {
  const locales = {};
  
  for (const locale of SUPPORTED_LOCALES) {
    locales[locale] = {};
    const localePath = path.join(LOCALES_PATH, locale);
    
    try {
      const files = await readdir(localePath);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const namespace = file.replace('.json', '');
          const content = await readFile(path.join(localePath, file), 'utf8');
          locales[locale][namespace] = JSON.parse(content);
        }
      }
    } catch (error) {
      console.error(`Error loading locale ${locale}:`, error);
    }
  }
  
  return locales;
}

// Main function
async function checkTranslations() {
  console.log('🔍 Checking for missing translations...\n');
  
  // Get all code files
  const componentFiles = await findFiles(COMPONENTS_PATH);
  const pageFiles = await findFiles(PAGES_PATH);
  const allFiles = [...componentFiles, ...pageFiles];
  
  // Extract keys from all files
  const allKeys = new Set();
  const fileKeys = {};
  
  for (const file of allFiles) {
    const keys = await extractKeysFromFile(file);
    fileKeys[file] = keys;
    keys.forEach(key => allKeys.add(key));
  }
  
  // Load locale data
  const locales = await loadLocaleFiles();
  
  // Check for missing translations
  const missingTranslations = {};
  
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) continue; // Skip default locale
    
    missingTranslations[locale] = {};
    
    for (const key of allKeys) {
      // Check if this key exists in any namespace for this locale
      let found = false;
      
      for (const namespace of Object.keys(locales[locale])) {
        if (locales[locale][namespace][key] !== undefined) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        // Find which files use this key
        const usedIn = [];
        for (const [file, keys] of Object.entries(fileKeys)) {
          if (keys.includes(key)) {
            usedIn.push(path.relative(process.cwd(), file));
          }
        }
        
        missingTranslations[locale][key] = usedIn;
      }
    }
  }
  
  // Report results
  let hasMissing = false;
  
  for (const [locale, keys] of Object.entries(missingTranslations)) {
    if (Object.keys(keys).length > 0) {
      hasMissing = true;
      console.log(`❌ Missing ${Object.keys(keys).length} translations for ${locale}:`);
      
      for (const [key, files] of Object.entries(keys)) {
        console.log(`   - ${key} (used in: ${files.join(', ')})`);
      }
      
      console.log('');
    }
  }
  
  if (!hasMissing) {
    console.log('✅ No missing translations found!');
  }
  
  // Check for unused translation keys
  console.log('\n🔍 Checking for unused translation keys...\n');
  
  const usedKeys = Array.from(allKeys);
  const unusedKeys = {};
  
  for (const locale of SUPPORTED_LOCALES) {
    unusedKeys[locale] = {};
    
    for (const namespace of Object.keys(locales[locale])) {
      for (const key of Object.keys(locales[locale][namespace])) {
        if (!usedKeys.includes(key)) {
          if (!unusedKeys[locale][namespace]) {
            unusedKeys[locale][namespace] = [];
          }
          unusedKeys[locale][namespace].push(key);
        }
      }
    }
  }
  
  // Report unused keys
  let hasUnused = false;
  
  for (const [locale, namespaces] of Object.entries(unusedKeys)) {
    for (const [namespace, keys] of Object.entries(namespaces)) {
      if (keys.length > 0) {
        hasUnused = true;
        console.log(`❌ ${locale}/${namespace}.json has ${keys.length} unused keys:`);
        console.log(`   - ${keys.join('\n   - ')}\n`);
      }
    }
  }
  
  if (!hasUnused) {
    console.log('✅ No unused translation keys found!');
  }
}

// Run the script
checkTranslations().catch(console.error);
