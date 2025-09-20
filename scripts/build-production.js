// Production deployment script - scripts/build-production.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build...\n');

// Check required files
const requiredFiles = [
  'next.config.js',
  'next-i18next.config.js', 
  'package.json',
  'public/locales',
  'data/resume',
  'public/documents'
];

requiredFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`❌ Required file/directory missing: ${file}`);
    process.exit(1);
  }
});

console.log('✅ All required files present\n');

// Install dependencies
console.log('📦 Installing dependencies...');
try {
  execSync('npm ci', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Type check
console.log('🔍 Running type check...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Type check passed\n');
} catch (error) {
  console.error('❌ Type check failed');
  process.exit(1);
}

// Lint
console.log('🧹 Running linter...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed\n');
} catch (error) {
  console.error('❌ Linting failed');
  process.exit(1);
}

// Build
console.log('🏗️ Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Check build output
const buildDir = '.next';
if (!fs.existsSync(buildDir)) {
  console.error('❌ Build directory not found');
  process.exit(1);
}

console.log('🎉 Production build completed successfully!');
console.log('\nNext steps:');
console.log('- Deploy to your hosting platform');
console.log('- Test all functionality in production');
console.log('- Monitor performance and errors');
