#!/usr/bin/env node
// scripts/audit-i18n.js

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const CONFIG = {
  sourcePatterns: [
    'pages/**/*.{tsx,ts,jsx,js}',
    'components/**/*.{tsx,ts,jsx,js}',
    'data/**/*.{tsx,ts,jsx,js}'
  ],
  localesDir: 'public/locales',
  baseLocale: 'en',
  supportedLocales: ['en', 'fr', 'ar', 'de', 'es', 'ja'],
  outputFile: 'i18n-audit-report.json',
  excludeFiles: [
    '**/*.test.*',
    '**/*.spec.*',
    '**/node_modules/**',
    '**/.next/**'
  ]
};

// Color codes for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class I18nAuditor {
  constructor() {
    this.results = {
      summary: {},
      missingKeys: {},
      unusedKeys: {},
      hardcodedStrings: [],
      recommendations: [],
      files: {}
    };
    
    this.translationKeys = new Map();
    this.usedKeys = new Set();
    this.potentialHardcodedStrings = [];
  }

  // Main audit function
  async audit() {
    console.log(`${colors.bold}${colors.blue}🌐 Starting Internationalization Audit${colors.reset}\n`);
    
    try {
      // Step 1: Load existing translations
      await this.loadExistingTranslations();
      
      // Step 2: Scan source files for t() usage
      await this.scanSourceFiles();
      
      // Step 3: Detect hardcoded strings
      this.detectHardcodedStrings();
      
      // Step 4: Generate report
      this.generateReport();
      
      // Step 5: Save results
      this.saveResults();
      
      // Step 6: Display summary
      this.displaySummary();
      
    } catch (error) {
      console.error(`${colors.red}Error during audit:${colors.reset}`, error);
      process.exit(1);
    }
  }

  // Load existing translation files
  async loadExistingTranslations() {
    console.log(`${colors.cyan}📚 Loading existing translations...${colors.reset}`);
    
    for (const locale of CONFIG.supportedLocales) {
      const localeDir = path.join(CONFIG.localesDir, locale);
      
      if (!fs.existsSync(localeDir)) {
        console.warn(`${colors.yellow}⚠️  Missing locale directory: ${localeDir}${colors.reset}`);
        continue;
      }
      
      const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.json'));
      
      for (const file of files) {
        const namespace = path.basename(file, '.json');
        const filePath = path.join(localeDir, file);
        
        try {
          const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const keys = this.flattenObject(content, namespace);
          
          if (!this.translationKeys.has(locale)) {
            this.translationKeys.set(locale, new Map());
          }
          
          keys.forEach((value, key) => {
            this.translationKeys.get(locale).set(key, value);
          });
          
        } catch (error) {
          console.error(`${colors.red}Error loading ${filePath}:${colors.reset}`, error.message);
        }
      }
    }
    
    const totalKeys = this.translationKeys.get(CONFIG.baseLocale)?.size || 0;
    console.log(`${colors.green}✅ Loaded ${totalKeys} keys from ${CONFIG.baseLocale} translations${colors.reset}\n`);
  }

  // Scan source files for internationalization usage
  async scanSourceFiles() {
    console.log(`${colors.cyan}🔍 Scanning source files...${colors.reset}`);
    
    const allFiles = [];
    for (const pattern of CONFIG.sourcePatterns) {
      const files = glob.sync(pattern, { ignore: CONFIG.excludeFiles });
      allFiles.push(...files);
    }
    
    console.log(`Found ${allFiles.length} files to scan`);
    
    for (const filePath of allFiles) {
      await this.scanFile(filePath);
    }
    
    console.log(`${colors.green}✅ Scanned ${allFiles.length} files${colors.reset}\n`);
  }

  // Scan individual file for t() usage and hardcoded strings
  async scanFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileResults = {
      path: filePath,
      usedKeys: [],
      potentialHardcoded: [],
      issues: []
    };

    // Pattern for t() function calls with various namespaces
    const tFunctionPatterns = [
      /t\(['"`]([^'"`]+)['"`]\)/g,                    // t('key')
      /t\(['"`]([^'"`]+)['"`],\s*{[^}]*}\)/g,        // t('key', {params})
      /\bt\(['"`]([^:'"`,]+):([^'"`,)]+)['"`]\)/g,   // t('namespace:key')
      /useTranslation\(\[?['"`]([^'"`,\]]+)['"`]/g    // useTranslation(['namespace'])
    ];

    // Extract t() usage
    for (const pattern of tFunctionPatterns.slice(0, -1)) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const key = match[1];
        this.usedKeys.add(key);
        fileResults.usedKeys.push(key);
      }
    }

    // Extract namespace from useTranslation
    const namespacePattern = tFunctionPatterns[3];
    let namespaceMatch;
    while ((namespaceMatch = namespacePattern.exec(content)) !== null) {
      // This helps us understand which namespaces are used in which files
      if (!fileResults.namespaces) fileResults.namespaces = [];
      fileResults.namespaces.push(namespaceMatch[1]);
    }

    // Detect potential hardcoded strings
    this.findHardcodedStrings(content, fileResults);

    this.results.files[filePath] = fileResults;
  }

  // Detect hardcoded strings that should be internationalized
  detectHardcodedStrings() {
    console.log(`${colors.cyan}🔤 Detecting hardcoded strings...${colors.reset}`);
    
    // This method processes all the hardcoded strings found in individual files
    Object.values(this.results.files).forEach(fileResults => {
      if (fileResults.potentialHardcoded && fileResults.potentialHardcoded.length > 0) {
        fileResults.potentialHardcoded.forEach(hardcoded => {
          this.potentialHardcodedStrings.push({
            ...hardcoded,
            file: fileResults.path
          });
        });
      }
    });
    
    console.log(`${colors.green}✅ Found ${this.potentialHardcodedStrings.length} potential hardcoded strings${colors.reset}`);
  }

  // Detect hardcoded strings that should be internationalized
  findHardcodedStrings(content, fileResults) {
    // Patterns for potential hardcoded text
    const hardcodedPatterns = [
      // JSX text content
      />([^<{]+[a-zA-Z]{3,}[^<{]*)</g,
      
      // String literals in common UI contexts
      /placeholder=['"`]([^'"`]{4,})['"`]/g,
      /title=['"`]([^'"`]{4,})['"`]/g,
      /alt=['"`]([^'"`]{4,})['"`]/g,
      /aria-label=['"`]([^'"`]{4,})['"`]/g,
      
      // Button text and labels
      /className[^>]*>([^<{]+[a-zA-Z]{3,}[^<{]*)</g,
      
      // Alert/toast messages
      /alert\(['"`]([^'"`]{10,})['"`]\)/g,
      /toast\(['"`]([^'"`]{10,})['"`]\)/g,
      
      // Console messages (development)
      /console\.(log|warn|error)\(['"`]([^'"`]{10,})['"`]\)/g
    ];

    const excludePatterns = [
      /^[0-9\s\-_.,!?:;()[\]{}@#$%^&*+=|\\/<>~`"']+$/, // Only special chars/numbers
      /^(https?:\/\/|\/[a-zA-Z]|\.\/|\.\.\/)/, // URLs and paths
      /^[A-Z_][A-Z0-9_]*$/, // Constants
      /^[a-zA-Z][a-zA-Z0-9]*\([^)]*\)$/, // Function calls
      /^(true|false|null|undefined)$/, // Literals
      /^(className|style|key|ref|id)$/, // Common props
      /^[a-z][a-zA-Z0-9]*$/, // Single words/camelCase vars
      /^\d+(\.\d+)?(px|em|rem|%|vh|vw|ms|s)$/, // CSS values
      /^rgb|rgba|hsl|hsla|#[0-9a-fA-F]/, // Colors
      /^(GET|POST|PUT|DELETE|PATCH)$/, // HTTP methods
      /^(dev|development|prod|production|test)$/, // Environment
    ];

    for (const pattern of hardcodedPatterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const text = match[1] || match[2];
        if (!text) continue;
        
        const cleanText = text.trim();
        
        // Skip if matches exclude patterns
        if (excludePatterns.some(exclude => exclude.test(cleanText))) {
          continue;
        }
        
        // Skip very short strings or those that look like code
        if (cleanText.length < 4 || 
            /^[a-z]+$/.test(cleanText) ||
            /^[A-Z]+$/.test(cleanText) ||
            cleanText.includes('${') ||
            cleanText.includes('{{')) {
          continue;
        }

        const hardcodedString = {
          text: cleanText,
          context: match[0],
          pattern: pattern.source
        };

        fileResults.potentialHardcoded.push(hardcodedString);
      }
    }
  }

  // Generate comprehensive report
  generateReport() {
    console.log(`${colors.cyan}📊 Generating report...${colors.reset}`);

    const baseTranslations = this.translationKeys.get(CONFIG.baseLocale) || new Map();

    // ---- missing / unused keys -------------------------------------------------
    const missingKeys = [];
    this.usedKeys.forEach(key => {
      if (!baseTranslations.has(key)) missingKeys.push(key);
    });

    const unusedKeys = [];
    baseTranslations.forEach((_, key) => {
      if (!this.usedKeys.has(key)) unusedKeys.push(key);
    });

    // ---- translation completeness per locale ----------------------------------
    const translationCompleteness = {};
    CONFIG.supportedLocales.forEach(locale => {
      if (locale === CONFIG.baseLocale) return;
      const localeTranslations = this.translationKeys.get(locale) || new Map();
      const missing = [];
      baseTranslations.forEach((_, key) => {
        if (!localeTranslations.has(key)) missing.push(key);
      });
      translationCompleteness[locale] = {
        total: baseTranslations.size,
        translated: localeTranslations.size,
        missing,
        percentage: Math.round((localeTranslations.size / baseTranslations.size) * 100)
      };
    });

    // ---- build the summary object --------------------------------------------
    const summary = {
      totalFiles: Object.keys(this.results.files).length,
      totalKeysUsed: this.usedKeys.size,
      totalKeysDefined: baseTranslations.size,
      missingKeysCount: missingKeys.length,
      unusedKeysCount: unusedKeys.length,
      hardcodedStringsCount: this.potentialHardcodedStrings.length,
      translationCompleteness   // ← stored here for later use
    };

    // ---- recommendations (now we pass the completeness object) ---------------
    const recommendations = this.generateRecommendations(
      missingKeys,
      unusedKeys,
      translationCompleteness   // <-- new argument
    );

    // ---- finally compose the full result object -------------------------------
    this.results = {
      summary,
      missingKeys,
      unusedKeys,
      hardcodedStrings: this.potentialHardcodedStrings,
      translationGaps: translationCompleteness,
      files: this.results.files,
      recommendations
    };
  }

  // Recommendations generator – receives translationCompleteness directly
  generateRecommendations(missingKeys, unusedKeys, translationCompleteness) {
    const recommendations = [];

    if (missingKeys.length > 0) {
      recommendations.push({
        type: 'critical',
        title: 'Add Missing Translation Keys',
        description: `${missingKeys.length} translation keys are used in code but not defined`,
        action: `Add these keys to public/locales/${CONFIG.baseLocale}/[namespace].json`,
        keys: missingKeys.slice(0, 10)
      });
    }

    if (unusedKeys.length > 0) {
      recommendations.push({
        type: 'optimization',
        title: 'Remove Unused Translation Keys',
        description: `${unusedKeys.length} translation keys are defined but never used`,
        action: 'Consider removing these keys to reduce bundle size',
        keys: unusedKeys.slice(0, 10)
      });
    }

    if (this.potentialHardcodedStrings.length > 0) {
      recommendations.push({
        type: 'improvement',
        title: 'Internationalize Hardcoded Strings',
        description: `${this.potentialHardcodedStrings.length} potential hardcoded strings found`,
        action: 'Replace with t() function calls',
        examples: this.potentialHardcodedStrings.slice(0, 5)
      });
    }

    // ---- translation‑coverage warnings ------------------------------------
    Object.entries(translationCompleteness).forEach(([locale, data]) => {
      if (data.percentage < 90) {
        recommendations.push({
          type: 'translation',
          title: `Complete ${locale.toUpperCase()} Translation`,
          description: `${locale} translations are ${data.percentage}% complete`,
          action: `Add ${data.missing.length} missing translations`,
          keys: data.missing.slice(0, 5)
        });
      }
    });

    return recommendations;
  }

  // Save results to file
  saveResults() {
    const outputPath = path.join(process.cwd(), CONFIG.outputFile);
    fs.writeFileSync(outputPath, JSON.stringify(this.results, null, 2));
    console.log(`${colors.green}✅ Report saved to ${CONFIG.outputFile}${colors.reset}`);
  }

  // Display summary in console
  displaySummary() {
    const { summary } = this.results;
    
    console.log(`
${colors.bold}${colors.blue}📋 INTERNATIONALIZATION AUDIT SUMMARY${colors.reset}`);
    console.log(`${'='.repeat(50)}\n`);
    
    console.log(`${colors.bold}Files Scanned:${colors.reset} ${summary.totalFiles}`);
    console.log(`${colors.bold}Translation Keys Used:${colors.reset} ${summary.totalKeysUsed}`);
    console.log(`${colors.bold}Translation Keys Defined:${colors.reset} ${summary.totalKeysDefined}\n`);
    
    // Issues
    if (summary.missingKeysCount > 0) {
      console.log(`${colors.red}❌ Missing Keys: ${summary.missingKeysCount}${colors.reset}`);
    }
    
    if (summary.unusedKeysCount > 0) {
      console.log(`${colors.yellow}⚠️  Unused Keys: ${summary.unusedKeysCount}${colors.reset}`);
    }
    
    if (summary.hardcodedStringsCount > 0) {
      console.log(`${colors.magenta}🔤 Potential Hardcoded Strings: ${summary.hardcodedStringsCount}${colors.reset}`);
    }
    
    // Translation completeness
    console.log(`
${colors.bold}Translation Completeness:${colors.reset}`);
    Object.entries(summary.translationCompleteness).forEach(([locale, data]) => {
      const color = data.percentage >= 95 ? colors.green : 
                   data.percentage >= 80 ? colors.yellow : colors.red;
      console.log(`  ${locale.toUpperCase()}: ${color}${data.percentage}%${colors.reset} (${data.translated}/${data.total})`);
    });

    // Show critical missing keys
    if (this.results.missingKeys.length > 0) {
      console.log(`
${colors.bold}${colors.red}Critical Missing Keys:${colors.reset}`);
      this.results.missingKeys.slice(0, 10).forEach(key => {
        console.log(`  - ${key}`);
      });
      if (this.results.missingKeys.length > 10) {
        console.log(`  ... and ${this.results.missingKeys.length - 10} more`);
      }
    }

    // Show recommendations
    if (this.results.recommendations.length > 0) {
      console.log(`
${colors.bold}${colors.cyan}Recommendations:${colors.reset}`);
      this.results.recommendations.forEach((rec, index) => {
        const icon = rec.type === 'critical' ? '🚨' : 
                    rec.type === 'translation' ? '🌐' : 
                    rec.type === 'optimization' ? '⚡' : '💡';
        console.log(`  ${index + 1}. ${icon} ${rec.title}: ${rec.description}`);
      });
    }

    console.log(`
${colors.green}✨ Audit completed! Check ${CONFIG.outputFile} for detailed results.${colors.reset}`);
  }

  // Utility: Flatten nested object to dot notation
  flattenObject(obj, prefix = '') {
    const flattened = new Map();
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;
      
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        const nested = this.flattenObject(value, newKey);
        nested.forEach((val, nestedKey) => {
          flattened.set(nestedKey, val);
        });
      } else {
        flattened.set(newKey, value);
      }
    });
    
    return flattened;
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${colors.bold}Internationalization Audit Tool${colors.reset}

Usage: node scripts/audit-i18n.js [options]

Options:
  --help, -h          Show this help message
  --fix-keys          Generate missing key templates
  --generate-hardcoded Generate t() replacements for hardcoded strings
  --locale <locale>   Focus on specific locale (default: all)

Examples:
  node scripts/audit-i18n.js                    # Full audit
  node scripts/audit-i18n.js --fix-keys         # Generate missing keys
  node scripts/audit-i18n.js --locale fr        # Check French translations
    `);
    process.exit(0);
  }
  
  const auditor = new I18nAuditor();
  await auditor.audit();
}

if (require.main === module) {
  main().catch(error => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, error);
    process.exit(1);
  });
}

module.exports = I18nAuditor;
