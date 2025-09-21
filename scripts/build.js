{
  "name": "badr-ribzat-portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export",
    "analyze": "cross-env ANALYZE=true next build",
    "type-check": "tsc --pretty --noEmit",
    "preview": "next build && next start",
    "clean": "rm -rf .next out",
    "prepare": "husky install",
    "generate-sitemap": "node scripts/generate-sitemap.js"
  }
}
