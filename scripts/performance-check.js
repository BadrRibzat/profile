# 6. Performance monitoring script - scripts/performance-check.js
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔍 Running performance checks...\n');

// Check bundle size
try {
  console.log('📦 Analyzing bundle size...');
  execSync('npm run analyze', { stdio: 'pipe' });
  
  const buildManifest = JSON.parse(
    fs.readFileSync('.next/build-manifest.json', 'utf8')
  );
  
  const pages = Object.keys(buildManifest.pages);
  console.log(`✅ Successfully built ${pages.length} pages`);
  
  // Check for large bundles
  const sizeWarningThreshold = 500000; // 500KB
  let hasLargeBundles = false;
  
  pages.forEach(page => {
    const pageFiles = buildManifest.pages[page];
    pageFiles.forEach(file => {
      const filePath = `.next/${file}`;
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.size > sizeWarningThreshold) {
          console.warn(`⚠️  Large bundle detected: ${file} (${Math.round(stats.size / 1024)}KB)`);
          hasLargeBundles = true;
        }
      }
    });
  });
  
  if (!hasLargeBundles) {
    console.log('✅ All bundles are optimally sized');
  }
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
}

// Check image optimization
console.log('\n🖼️  Checking image optimization...');
const imageDir = './public/images';
if (fs.existsSync(imageDir)) {
  const images = fs.readdirSync(imageDir, { recursive: true })
    .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
  
  let largeImages = 0;
  images.forEach(img => {
    const imgPath = `${imageDir}/${img}`;
    const stats = fs.statSync(imgPath);
    if (stats.size > 1000000) { // 1MB
      console.warn(`⚠️  Large image: ${img} (${Math.round(stats.size / 1024)}KB)`);
      largeImages++;
    }
  });
  
  if (largeImages === 0) {
    console.log(`✅ All ${images.length} images are optimized`);
  } else {
    console.log(`⚠️  ${largeImages} images could be optimized`);
  }
}

// Check document files
console.log('\n📄 Checking document files...');
const docsDir = './public/documents';
if (fs.existsSync(docsDir)) {
  const docs = fs.readdirSync(docsDir, { recursive: true })
    .filter(file => file.endsWith('.pdf'));
  
  let totalSize = 0;
  docs.forEach(doc => {
    const docPath = `${docsDir}/${doc}`;
    const stats = fs.statSync(docPath);
    totalSize += stats.size;
  });
  
  console.log(`✅ ${docs.length} PDF documents (${Math.round(totalSize / 1024 / 1024)}MB total)`);
}

console.log('\n🎉 Performance check completed!');

