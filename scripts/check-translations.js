# 7. Translation validation script - scripts/check-translations.js
const fs = require('fs');
const path = require('path');

const localesDir = './public/locales';
const requiredLocales = ['en', 'fr', 'ar', 'de', 'es', 'ja'];
const requiredNamespaces = ['common', 'documents', 'about', 'projects', 'contact', 'resume'];

console.log('🌐 Checking translation completeness...\n');

let allValid = true;

// Load base translations (English)
const baseTranslations = {};
requiredNamespaces.forEach(namespace => {
  const basePath = path.join(localesDir, 'en', `${namespace}.json`);
  if (fs.existsSync(basePath)) {
    baseTranslations[namespace] = JSON.parse(fs.readFileSync(basePath, 'utf8'));
  }
});

// Check each locale
requiredLocales.forEach(locale => {
  console.log(`Checking ${locale}...`);
  let localeValid = true;
  
  requiredNamespaces.forEach(namespace => {
    const translationPath = path.join(localesDir, locale, `${namespace}.json`);
    
    if (!fs.existsSync(translationPath)) {
      console.error(`❌ Missing translation file: ${locale}/${namespace}.json`);
      localeValid = false;
      allValid = false;
      return;
    }
    
    const translations = JSON.parse(fs.readFileSync(translationPath, 'utf8'));
    const baseKeys = getAllKeys(baseTranslations[namespace] || {});
    const translationKeys = getAllKeys(translations);
    
    const missingKeys = baseKeys.filter(key => !translationKeys.includes(key));
    const extraKeys = translationKeys.filter(key => !baseKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.error(`❌ ${locale}/${namespace}: Missing keys:`, missingKeys);
      localeValid = false;
      allValid = false;
    }
    
    if (extraKeys.length > 0) {
      console.warn(`⚠️  ${locale}/${namespace}: Extra keys:`, extraKeys);
    }
  });
  
  if (localeValid) {
    console.log(`✅ ${locale} translations complete`);
  }
  console.log('');
});

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], newKey));
    } else {
      keys.push(newKey);
    }
  }
  return keys;
}

if (allValid) {
  console.log('🎉 All translations are complete!');
  process.exit(0);
} else {
  console.log('❌ Translation issues found. Please fix them before deploying.');
  process.exit(1);
}
