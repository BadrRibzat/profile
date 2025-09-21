#!/usr/bin/env node
// scripts/fix-missing-keys.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const CONFIG = {
  localesDir: 'public/locales',
  baseLocale: 'en',
  supportedLocales: ['en', 'fr', 'ar', 'de', 'es', 'ja'],
  backupDir: 'backup-locales'
};

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class MissingKeysFixer {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async run() {
    console.log(`${colors.bold}${colors.blue}🔧 Missing Keys Auto‑Fixer${colors.reset}\n`);

    // -----------------------------------------------------------------
    // 1️⃣ Load the audit report (or run audit first)
    // -----------------------------------------------------------------
    const auditFile = 'i18n-audit-report.json';
    if (!fs.existsSync(auditFile)) {
      console.log(`${colors.yellow}No audit report found. Running audit first...${colors.reset}`);
      const { execSync } = require('child_process');
      execSync('node scripts/audit-i18n.js', { stdio: 'inherit' });
    }

    const auditResults = JSON.parse(fs.readFileSync(auditFile, 'utf8'));
    if (auditResults.missingKeys.length === 0) {
      console.log(`${colors.green}✅ No missing keys found!${colors.reset}`);
      return;
    }

    console.log(`Found ${auditResults.missingKeys.length} missing keys`);
    const answer = await this.question('Would you like to auto‑generate templates? (y/n) ');
    if (answer.toLowerCase() !== 'y') {
      console.log('Skipping auto‑generation');
      return;
    }

    // -----------------------------------------------------------------
    // 2️⃣ Backup current locale folder
    // -----------------------------------------------------------------
    this.createBackup();

    // -----------------------------------------------------------------
    // 3️⃣ Generate missing keys (fixed version)
    // -----------------------------------------------------------------
    await this.generateMissingKeys(auditResults.missingKeys);

    console.log(`${colors.green}✅ Missing keys generated successfully!${colors.reset}`);
    console.log(`${colors.yellow}Please review and update the placeholder text in your locale files.${colors.reset}`);
  }

  // -----------------------------------------------------------------
  // Backup helper
  // -----------------------------------------------------------------
  createBackup() {
    if (!fs.existsSync(CONFIG.backupDir)) {
      fs.mkdirSync(CONFIG.backupDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(CONFIG.backupDir, `backup-${timestamp}`);
    fs.cpSync(CONFIG.localesDir, backupPath, { recursive: true });
    console.log(`${colors.green}✅ Created backup at ${backupPath}${colors.reset}`);
  }

  // -----------------------------------------------------------------
  // Main generation routine (fixed)
  // -----------------------------------------------------------------
  async generateMissingKeys(missingKeys) {
    // Group keys by namespace (e.g. "projects.filters.all" → namespace "projects", key "filters.all")
    const keysByNamespace = this.groupKeysByNamespace(missingKeys);

    for (const [namespace, keys] of Object.entries(keysByNamespace)) {
      console.log(`\n${colors.cyan}Processing namespace: ${namespace}${colors.reset}`);

      // Load existing translations for *all* locales (or empty object if file missing)
      const localeData = {};
      for (const locale of CONFIG.supportedLocales) {
        const filePath = path.join(CONFIG.localesDir, locale, `${namespace}.json`);
        if (fs.existsSync(filePath)) {
          try {
            localeData[locale] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          } catch (e) {
            console.warn(`${colors.yellow}⚠️  Could not parse ${filePath}, starting fresh.${colors.reset}`);
            localeData[locale] = {};
          }
        } else {
          localeData[locale] = {};
        }
      }

      // Add missing keys to each locale object
      for (const fullKey of keys) {
        const smartDefault = this.generateSmartDefault(fullKey, namespace);
        const keyParts = fullKey.split('.'); // e.g. ["filters","all"]

        for (const locale of CONFIG.supportedLocales) {
          const targetObj = localeData[locale];
          let current = targetObj;

          // Walk/create nested structure
          keyParts.forEach((part, idx) => {
            if (idx === keyParts.length - 1) {
              // Final leaf – set value
              if (locale === CONFIG.baseLocale) {
                current[part] = smartDefault;
              } else {
                current[part] = `[${locale.toUpperCase()}] ${smartDefault}`;
              }
            } else {
              if (!current[part] || typeof current[part] !== 'object') {
                current[part] = {};
              }
              current = current[part];
            }
          });
        }
      }

      // Write updated files back (sorted keys)
      for (const locale of CONFIG.supportedLocales) {
        const filePath = path.join(CONFIG.localesDir, locale, `${namespace}.json`);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

        const sorted = this.sortObjectKeys(localeData[locale]);
        fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2) + '\n');
        console.log(`${colors.green}  ✅ Updated ${locale}/${namespace}.json${colors.reset}`);
      }
    }
  }

  // -----------------------------------------------------------------
  // Helper: group keys by namespace (e.g. "projects.filters.all")
  // -----------------------------------------------------------------
  groupKeysByNamespace(missingKeys) {
    const grouped = {};

    missingKeys.forEach(fullKey => {
      const [namespace, ...keyParts] = fullKey.split('.');
      const key = keyParts.join('.'); // keep dot‑notation for nested objects
      if (!grouped[namespace]) grouped[namespace] = [];
      grouped[namespace].push(key);
    });

    return grouped;
  }

  // -----------------------------------------------------------------
  // Smart default generator (unchanged – just returns a human‑readable string)
  // -----------------------------------------------------------------
  generateSmartDefault(key, namespace) {
    const keyLower = key.toLowerCase();

    // Common UI patterns
    if (keyLower.includes('button')) return this.humanize(key.replace(/button/gi, '').trim()) || 'Button';
    if (keyLower.includes('title')) return this.humanize(key.replace(/title/gi, '').trim()) || 'Title';
    if (keyLower.includes('description')) return this.humanize(key.replace(/description/gi, '').trim()) + ' Description';
    if (keyLower.includes('placeholder')) return 'Enter ' + this.humanize(key.replace(/placeholder/gi, '').trim()).toLowerCase();
    if (keyLower.includes('error')) return 'An error occurred';
    if (keyLower.includes('success')) return 'Success!';
    if (keyLower.includes('loading')) return 'Loading...';
    if (keyLower.includes('save')) return 'Save';
    if (keyLower.includes('cancel')) return 'Cancel';
    if (keyLower.includes('delete')) return 'Delete';
    if (keyLower.includes('edit')) return 'Edit';
    if (keyLower.includes('add')) return 'Add';
    if (keyLower.includes('remove')) return 'Remove';
    if (keyLower.includes('close')) return 'Close';
    if (keyLower.includes('open')) return 'Open';
    if (keyLower.includes('next')) return 'Next';
    if (keyLower.includes('previous') || keyLower.includes('prev')) return 'Previous';
    if (keyLower.includes('back')) return 'Back';
    if (keyLower.includes('continue')) return 'Continue';
    if (keyLower.includes('submit')) return 'Submit';
    if (keyLower.includes('confirm')) return 'Confirm';
    if (keyLower.includes('name')) return 'Name';
    if (keyLower.includes('email')) return 'Email';
    if (keyLower.includes('password')) return 'Password';
    if (keyLower.includes('search')) return 'Search';
    if (keyLower.includes('filter')) return 'Filter';
    if (keyLower.includes('sort')) return 'Sort';
    if (keyLower.includes('date')) return 'Date';
    if (keyLower.includes('time')) return 'Time';

    // Namespace‑specific defaults
    if (namespace === 'documents') {
      if (keyLower.includes('category')) return 'Category';
      if (keyLower.includes('language')) return 'Language';
      if (keyLower.includes('issued')) return 'Issued';
      if (keyLower.includes('issuer')) return 'Issuer';
      if (keyLower.includes('certificate')) return 'Certificate';
      if (keyLower.includes('diploma')) return 'Diploma';
      if (keyLower.includes('transcript')) return 'Transcript';
    }

    if (namespace === 'projects') {
      if (keyLower.includes('technology') || keyLower.includes('tech')) return 'Technology';
      if (keyLower.includes('demo')) return 'Live Demo';
      if (keyLower.includes('source')) return 'Source Code';
      if (keyLower.includes('github')) return 'GitHub';
    }

    if (namespace === 'resume') {
      if (keyLower.includes('experience')) return 'Experience';
      if (keyLower.includes('education')) return 'Education';
      if (keyLower.includes('skills')) return 'Skills';
      if (keyLower.includes('contact')) return 'Contact';
    }

    // Default: humanize the key itself
    return this.humanize(key) || 'Translation needed';
  }

  humanize(str) {
    if (!str) return '';
    return str
      .split(/[._-]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
      .trim();
  }

  // -----------------------------------------------------------------
  // Helper: sort object keys recursively (nice, deterministic JSON)
  // -----------------------------------------------------------------
  sortObjectKeys(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return obj;
    const sorted = {};
    Object.keys(obj).sort().forEach(key => {
      sorted[key] = this.sortObjectKeys(obj[key]);
    });
    return sorted;
  }

  // -----------------------------------------------------------------
  // Helper: readline wrapper
  // -----------------------------------------------------------------
  question(prompt) {
    return new Promise(resolve => this.rl.question(prompt, resolve));
  }
}

// -----------------------------------------------------------------
// CLI entry point
// -----------------------------------------------------------------
async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
${colors.bold}Missing Keys Auto‑Fixer${colors.reset}

Usage: node scripts/fix-missing-keys.js [options]

Options:
  --help, -h          Show this help
  --dry-run           Show what would be written without touching files

The script reads ${colors.cyan}i18n-audit-report.json${colors.reset},
generates missing translation keys and writes them back to
<locale>/<namespace>.json (e.g. en/common.json, fr/projects.json, …).
`);
    process.exit(0);
  }

  const fixer = new MissingKeysFixer();
  await fixer.run();
}

if (require.main === module) {
  main().catch(err => {
    console.error(`${colors.red}Fatal error:${colors.reset}`, err);
    process.exit(1);
  });
}
